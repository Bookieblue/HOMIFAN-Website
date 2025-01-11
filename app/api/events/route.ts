import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await prisma.event.findMany();
    return NextResponse.json({
      message: "Events retrieved successfully",
      data: members,
    });
  } catch (error) {
    throw error;
  }
}
