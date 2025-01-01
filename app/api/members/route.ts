import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IMember } from "../../interface";
import { memberSchema } from "@/app/validators";
import { formatZodError } from "@/app/utils/formatter";

export async function POST(req: NextRequest) {
  const payload: IMember = await req.json();
  const { email } = payload;
  try {
    const validation = memberSchema.safeParse(payload);

    if (!validation.success) {
      return NextResponse.json(
        {
          status: true,
          message: formatZodError(validation.error),
        },
        { status: 400 }
      );
    }

    const member = await prisma.member.findUnique({ where: { email } });

    if (member) {
      return NextResponse.json(
        {
          status: false,
          message: "Oops...Email alredy registered",
        },
        { status: 409 }
      );
    }

    const newMenmber = await prisma.member.create({
      data: payload,
    });
    return NextResponse.json({
      message: "New member join successfully",
      data: newMenmber,
    });
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany();
    return NextResponse.json({
      message: "Members retrieved successfully",
      data: members,
    });
  } catch (error) {
    throw error;
  }
}
