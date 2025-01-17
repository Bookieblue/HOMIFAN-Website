import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ publication_id: string }> }
) {
  const pubId = (await params).publication_id;

  try {
    const publication = await prisma.publication.findUnique({
      where: { id: pubId },
    });

    if (!publication) {
      return NextResponse.json({
        status: false,
        message: "Publication not found!",
      });
    }

    return NextResponse.json({
      status: true,
      data: publication,
      message: "Publication retrieved successfully",
    });
  } catch (error) {
    throw error;
  }
}
