import prisma from "@/app/lib/prisma";
import { formatZodError } from "@/app/utils/formatter";
import { NextResponse } from "next/server";
import { z } from "zod";

const memberIdSchema = z.string().uuid();

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ member: string }> }
) => {
  const memberId = (await params).member;

  try {
    const validation = memberIdSchema.safeParse(memberId);

    if (!validation.success) {
      return NextResponse.json(
        { message: formatZodError(validation.error) },
        { status: 400 }
      );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json(
        { message: "Oops...Member not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: member,
        message: "Member retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving member:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
