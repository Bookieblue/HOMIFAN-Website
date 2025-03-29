import { IContact } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { paginateQuery } from "@/app/utils/paginate";
import { contactUsSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload: IContact = await request.json();

  try {
    const validation = contactUsSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }

    const contact = await prisma.contact.findFirst({
      where: {
        ...payload,
      },
    });

    if (contact) {
      return sendErrorResponse(
        NextResponse,
        "Oops...This contact message already exists",
        409
      );
    }

    const newContact = await prisma.contact.create({
      data: payload,
    });

    return sendSuccessResponse(
      NextResponse,
      newContact,
      "Contact message added successfully"
    );
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const search = searchParams.get("search") || "";

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
            ],
          }
        : {},
      model: prisma.contact,
      options: { page, limit },
    });

    const { data, ...metadata } = result;
    const contacts = data;
    return sendSuccessResponse(
      NextResponse,
      { contacts, ...metadata },
      "Contact messages retrieved successfully"
    );
  } catch (error: any) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
}
