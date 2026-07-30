import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      // Return default if not found
      return NextResponse.json({ telegramUrl: "https://t.me/nexabot_support" });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings", error);
    return NextResponse.json({ telegramUrl: "https://t.me/nexabot_support" }); // Fallback
  }
}
