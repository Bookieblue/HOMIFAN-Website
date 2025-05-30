import { IMember } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { idSchema, memberSchema } from "@/app/validators";

// GET: Fetch member by ID
export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ member: string }> }
) => {
  const memberId = (await params).member;

  try {
    // Validate member ID
    const validation = idSchema.safeParse(memberId);
    if (!validation.success) {
      return sendErrorResponse(NextResponse, "Invalid member ID format", 400);
    }

    // Find the member
    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new ApiError("Member not found", 404);
    }

    return sendSuccessResponse(
      NextResponse,
      member,
      "Member retrieved successfully"
    );
  } catch (error: any) {
    return sendErrorResponse(NextResponse, error.message, 500);
  }
};

// PUT: Update member by ID
export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ member: string }> }
) => {
  const memberId = (await params).member;

  try {
    // Validate member ID
    const validation = idSchema.safeParse(memberId);
    if (!validation.success) {
      return sendErrorResponse(NextResponse, "Invalid member ID format", 400);
    }

    // Parse and sanitize request body
    const rawPayload = await request.json();

    // Find the member
    const existingMember = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!existingMember) {
      return sendErrorResponse(NextResponse, "Member not found", 404);
    }

    // Sanitize input fields
    const payload: Partial<IMember> = {
      firstName: rawPayload.firstName
        ? String(rawPayload.firstName).trim()
        : existingMember.firstName,
      lastName: rawPayload.lastName
        ? String(rawPayload.lastName).trim()
        : existingMember.lastName,
      email: rawPayload.email
        ? String(rawPayload.email).trim().toLowerCase()
        : existingMember.email,
      phoneNumber: rawPayload.phoneNumber
        ? String(rawPayload.phoneNumber).trim()
        : existingMember.phoneNumber,
      country: rawPayload.country
        ? String(rawPayload.country).trim()
        : existingMember.country,
      cityAndState: rawPayload.cityAndState
        ? String(rawPayload.cityAndState).trim()
        : existingMember.cityAndState,
      areaOfInterest: rawPayload.areaOfInterest
        ? String(rawPayload.areaOfInterest).trim()
        : existingMember.areaOfInterest,
      methodOfContact: rawPayload.methodOfContact
        ? String(rawPayload.methodOfContact).trim()
        : existingMember.methodOfContact,
    };

    // Validate with Zod schema
    const schemaValidation = memberSchema.safeParse(payload);
    if (!schemaValidation.success) {
      return sendErrorResponse(
        NextResponse,
        JSON.stringify(schemaValidation.error.format()),
        400
      );
    }

    // Check if email or phone number already exists for another member
    if (
      payload.email !== existingMember.email ||
      payload.phoneNumber !== existingMember.phoneNumber
    ) {
      const duplicateMember = await prisma.member.findFirst({
        where: {
          OR: [
            { email: payload.email as string },
            { phoneNumber: payload.phoneNumber as string },
          ],
          NOT: { id: memberId },
        },
      });

      if (duplicateMember) {
        return sendErrorResponse(
          NextResponse,
          "Email or phone number already registered by another member",
          409
        );
      }
    }

    // Update the member
    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: payload,
    });

    return sendSuccessResponse(
      NextResponse,
      updatedMember,
      "Member updated successfully"
    );
  } catch (error: any) {
    return sendErrorResponse(NextResponse, error.message, 500);
  }
};

// DELETE: Delete member by ID
export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ member: string }> }
) => {
  const memberId = (await params).member;
  try {
    // Validate member ID
    const validation = idSchema.safeParse(memberId);
    if (!validation.success) {
      return sendErrorResponse(NextResponse, "Invalid member ID format", 400);
    }

    // Check if member exists
    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return sendErrorResponse(NextResponse, "Member not found", 404);
    }

    // Delete the member
    await prisma.member.delete({
      where: { id: memberId },
    });

    return sendSuccessResponse(
      NextResponse,
      null,
      "Member deleted successfully"
    );
  } catch (error: any) {
    return sendErrorResponse(NextResponse, error.message, 500);
  }
};
