import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IMember } from "../../interface";
import { memberSchema } from "@/app/validators";
import { sendSuccessResponse } from "@/app/utils/apiResponse";
import { paginateQuery } from "@/app/utils/paginate";
import { ApiError, withErrorHandler } from "@/app/utils/errorHandler";

export const POST = withErrorHandler(async (req: NextRequest) => {
  // Parse and sanitize request body
  const rawPayload = await req.json();

  // Sanitize input fields
  const payload: Partial<IMember> = {
    firstName: String(rawPayload.firstName || "").trim(),
    lastName: String(rawPayload.lastName || "").trim(),
    email: String(rawPayload.email || "")
      .trim()
      .toLowerCase(),
    phoneNumber: String(rawPayload.phoneNumber || "").trim(),
    country: String(rawPayload.country || "").trim(),
    cityAndState: String(rawPayload.cityAndState || "").trim(),
    areaOfInterest: String(rawPayload.areaOfInterest || "").trim(),
    methodOfContact: String(rawPayload.methodOfContact || "").trim(),
  };

  // Validate with Zod schema
  const validation = memberSchema.safeParse(payload);
  if (!validation.success) {
    throw new ApiError(JSON.stringify(validation.error.format()), 400);
  }

  const { email, phoneNumber } = payload;

  // Check for existing member
  const member = await prisma.member.findFirst({
    where: {
      OR: [{ email: email as string }, { phoneNumber: phoneNumber as string }],
    },
  });

  if (member) {
    throw new ApiError("Email or phone number already registered", 409);
  }

  // Create new member
  const newMember = await prisma.member.create({
    data: payload as IMember,
  });

  return sendSuccessResponse(
    NextResponse,
    newMember,
    "New member joined successfully",
    201
  );
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const search = searchParams.get("search") || "";

  // Validate pagination parameters
  if (page < 1 || limit < 1 || limit > 100) {
    throw new ApiError("Invalid pagination parameters", 400);
  }

  // Perform search with pagination
  const result = await paginateQuery({
    where: search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phoneNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    model: prisma.member,
    options: { page, limit },
    orderBy: {
      createdAt: "desc", // Most recent members first
    },
  });

  const { data: members, ...metadata } = result;

  return sendSuccessResponse(
    NextResponse,
    { members, ...metadata },
    "Members retrieved successfully"
  );
});
