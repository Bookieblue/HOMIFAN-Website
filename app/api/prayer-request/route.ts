import { IPrayerRequest } from "@/app/interface";
import prisma from "@/app/lib/prisma";
import { paginateQuery } from "@/app/utils/paginate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload: IPrayerRequest = await request.json();

  try {
    const prayerReq = await prisma.prayerRequest.findFirst({
      where: {
        ...payload,
      },
    });

    if (prayerReq) {
      return NextResponse.json(
        {
          status: false,
          message: "Oops...This prayer Request already exists",
        },
        { status: 409 }
      );
    }

    const newPrayerReq = await prisma.prayerRequest.create({
      data: payload,
    });

    return NextResponse.json(
      {
        status: true,
        data: newPrayerReq,
        message: "Prayer request added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const page = Number((searchParams.get("page") as string) || 1);
    const limit = Number((searchParams.get("limit") as string) || 20);

    const result = await paginateQuery({
      model: prisma.prayerRequest,
      options: { page, limit },
    });

    const { data, ...metadata } = result;
    const prayerRepests = data;

    return NextResponse.json(
      {
        message: "Prayer requests retrieved successfully",
        data: { prayerRepests, ...metadata },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching prayer requests:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch  prayer requests",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
