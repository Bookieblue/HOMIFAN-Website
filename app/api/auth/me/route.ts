import { NextRequest, NextResponse } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import prisma from "@/app/lib/prisma";

/**
 * GET: Get current admin user
 *
 * This endpoint returns the current admin user based on the JWT token
 */
export async function GET(request: NextRequest) {
  try {
    // Get admin ID from request headers (set by middleware)
    const adminId = request.headers.get("x-admin-id");

    if (!adminId) {
      return sendErrorResponse(NextResponse, "Unauthorized", 401);
    }

    // Find admin by ID
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return sendErrorResponse(NextResponse, "Admin not found", 404);
    }

    // Return admin without password
    return sendSuccessResponse(
      NextResponse,
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      "Admin retrieved successfully"
    );
  } catch (error) {
    console.error("Error in GET /api/admin/current:", error);
    return sendErrorResponse(NextResponse, "Internal server error", 500);
  }
}
