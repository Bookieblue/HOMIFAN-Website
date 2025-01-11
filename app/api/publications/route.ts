import { IPublication } from "@/app/interface";
import cloudinary from "@/app/lib/cloudinary";
import prisma from "@/app/lib/prisma";
import { paginateQuery } from "@/app/utils/paginate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;

    const payload: IPublication = {
      title,
      description,
      price: Number(price),
    };

    const pub = await prisma.publication.findFirst({
      where: { title, description },
    });

    if (pub) {
      return NextResponse.json(
        {
          status: false,
          message: "Publication already exists",
        },
        { status: 400 }
      );
    }

    const file = formData.get("coverImage") as File | null;
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    console.log({ file });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    payload.coverUrl = result.secure_url;

    const newPub = await prisma.publication.create({
      data: payload,
    });

    return NextResponse.json(
      {
        status: true,
        data: newPub,
        message: "Publication added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number((searchParams.get("page") as string) || 1);
    const limit = Number((searchParams.get("limit") as string) || 20);

    const result = await paginateQuery({
      model: prisma.publication,
      options: {
        page,
        limit,
      },
    });
    const { data: publications, ...metadata } = result;

    return NextResponse.json({
      status: true,
      data: { publications, ...metadata },
      message: "Publications retrieved successfully",
    });
  } catch (error) {
    throw error;
  }
}
