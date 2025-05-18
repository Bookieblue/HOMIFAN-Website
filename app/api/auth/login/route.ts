import { NextRequest, NextResponse } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { adminLoginSchema } from "@/app/validators";
import prisma from "@/app/lib/prisma";
import { comparePassword, generateToken } from "@/app/utils/auth";
import { z } from "zod";

interface IAdminLoginSchema extends z.infer<typeof adminLoginSchema> {}

/**
 * POST: Admin login endpoint
 *
 * This endpoint authenticates an admin user and returns a JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const payload: IAdminLoginSchema = await request.json();

    const validation = adminLoginSchema.safeParse(payload);
    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const { email, password } = validation.data;

    // Find admin by email (case-insensitive)
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return sendErrorResponse(NextResponse, "Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return sendErrorResponse(NextResponse, "Invalid email or password", 401);
    }

    // Generate JWT token
    const token = generateToken(admin);

    return sendSuccessResponse(
      NextResponse,
      {
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Error in POST /api/admin/login:", error);
    return sendErrorResponse(NextResponse, "Internal server error", 500);
  }
}
