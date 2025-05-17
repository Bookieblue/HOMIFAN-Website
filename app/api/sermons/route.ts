import prisma from "@/app/lib/prisma";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/app/utils/apiResponse";
import { formatZodError } from "@/app/utils/formatter";
import { eventSchema, sermonSchema } from "@/app/validators";
import { NextRequest, NextResponse } from "next/server";
import { Status } from "../enum";
import { ISermon } from "@/app/interface";
import { uploadFile } from "@/app/utils/file";
import { paginateQuery } from "@/app/utils/paginate";
import { extractTokenFromRequest, verifyToken } from "@/app/utils/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const text = searchParams.get("search") || "";
  try {
    const result = await paginateQuery({
      where: text
        ? {
            OR: [
              {
                title: {
                  contains: text,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: text,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      model: prisma.sermon,
      options: {
        page,
        limit,
      },
    });
    const { data: sermons, ...metadata } = result;
    return sendSuccessResponse(
      NextResponse,
      { sermons, ...metadata },
      "Sermons retrieved successfully"
    );
  } catch (error) {
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = extractTokenFromRequest(request);
    const decodedToken = verifyToken(token);
    // Now you can use decodedToken.userId or other properties
    if (decodedToken.role !== "admin") {
      return sendErrorResponse(NextResponse, "Unauthorized", 401);
    }
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const preacher = formData.get("preacher") as string;
    const link = formData.get("link") as string;

    const payload: Partial<ISermon> = {
      title,
      description,
      link,
      preacher,
      status: Status.unpublish,
    };

    const validation = sermonSchema.safeParse(payload);

    if (!validation.success) {
      return sendErrorResponse(
        NextResponse,
        formatZodError(validation.error),
        400
      );
    }
    const sermon = await prisma.sermon.findFirst({
      where: {
        title,
        description,
        preacher,
      },
    });

    if (sermon) {
      return sendErrorResponse(NextResponse, "Oops..Sermon already exist", 409);
    }

    const thumbnail = formData.get("thumbnail") as File | null;
    if (!thumbnail || !(thumbnail instanceof Blob)) {
      return sendErrorResponse(
        NextResponse,
        "thumbnail field is required as a File",
        400
      );
    }
    const result = await uploadFile(thumbnail, "sermons");
    payload.thumbnail = result.secure_url;

    const newSermon = await prisma.sermon.create({
      data: payload as any,
    });

    return sendSuccessResponse(
      NextResponse,
      newSermon,
      "Sermon added successfully",
      201
    );
  } catch (error) {
    throw error;
  }
}
