import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.redirect("/auth/sign-in");
    }

    const { id } = session.user;

    const shapes = await prisma.shape.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ shapes }, { status: 200 });
  } catch (error) {
    console.error("GET", error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.redirect("/auth/sign-in");
    }

    const { id } = session.user;

    const body = await req.json();
    const { title, shapeConfig, shapeId, image } = body;

    const shape = await prisma.shape.upsert({
      where: {
        id: shapeId || "",
      },
      update: {
        title,
        shapeConfig,
        image,
      },
      create: {
        title,
        shapeConfig,
        authorId: id,
        image,
      },
    });

    return NextResponse.json({ shape }, { status: 201 });
  } catch (error) {
    console.error("POST", error);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.redirect("/auth/sign-in");
    }

    const body = await req.json();
    const { shapeId } = body;

    const shape = await prisma.shape.delete({
      where: {
        id: shapeId,
      },
    });

    return NextResponse.json({ shape }, { status: 200 });
  } catch (error) {
    console.error("DELETE", error);
  }
}
