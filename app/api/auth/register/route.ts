import { NextRequest, NextResponse } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { adminSchema } from "@/app/validators";
import prisma from "@/app/lib/prisma";
import { hashPassword } from "@/app/utils/auth";
import { z } from "zod";

interface IAdminSchema extends z.infer<typeof adminSchema> {}

/**
 * POST: Admin registration endpoint
 *
 * This endpoint registers a new admin user
 * Note: In a production environment, this should be secured or disabled after initial setup
 */
export async function POST(request: NextRequest) {
  try {
    const payload: IAdminSchema = await request.json();

    const validation = adminSchema.safeParse(payload);
    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const { username, email, password, role } = validation.data;

    // Check if admin with same email or username already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      },
    });

    if (existingAdmin) {
      return sendErrorResponse(
        NextResponse,
        "Admin with this email or username already exists",
        409
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new admin
    const admin = await prisma.admin.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "admin",
      },
    });

    // Return success response without password
    return sendSuccessResponse(
      NextResponse,
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      "Admin registered successfully",
      201
    );
  } catch (error) {
    console.error("Error in POST /api/admin/register:", error);
    return sendErrorResponse(NextResponse, "Internal server error", 500);
  }
}
