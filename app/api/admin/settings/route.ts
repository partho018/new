import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { telegramUrl } = await request.json();

    if (!telegramUrl) {
      return NextResponse.json({ error: "telegramUrl is required" }, { status: 400 });
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { telegramUrl },
      create: { id: "global", telegramUrl },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Failed to update settings", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
