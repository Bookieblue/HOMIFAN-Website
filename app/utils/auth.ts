import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IAdmin, IAuthToken } from "../interface";
import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "./apiResponse";

// Ensure JWT_SECRET is defined (throw error if missing)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

/**
 * Generate a JWT token for an admin user.
 * @param admin - Admin user object.
 * @returns JWT token.
 * @throws Error if token generation fails.
 */
export const generateToken = (admin: IAdmin): string => {
  try {
    const payload: IAuthToken = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new Error("Failed to generate JWT token.");
  }
};

/**
 * Verify a JWT token.
 * @param token - JWT token to verify.
 * @returns Decoded token payload.
 * @throws Error if token is invalid or expired.
 */
export const verifyToken = (token: string): IAuthToken => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as IAuthToken;
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};

/**
 * Extract token from request headers.
 * @param req - Next.js request object.
 * @returns Extracted JWT token.
 * @throws Error if no token is provided.
 */
export const extractTokenFromRequest = (req: NextRequest): string => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided.");
  }

  return authHeader.split(" ")[1];
};

/**
 * Hash a password.
 * @param password - Plain text password.
 * @returns Hashed password.
 * @throws Error if hashing fails.
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Failed to hash password.");
  }
};

/**
 * Compare a password with a hash.
 * @param password - Plain text password.
 * @param hash - Hashed password.
 * @returns Whether the password matches the hash.
 * @throws Error if comparison fails.
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Failed to compare passwords.");
  }
};
