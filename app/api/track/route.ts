import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId } = body;

    if (!visitorId) {
      return NextResponse.json({ error: "No visitorId provided" }, { status: 400 });
    }

    // Get IP Address
    // Vercel edge/serverless headers for IP:
    let ipAddress = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "unknown";
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }
    if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
       ipAddress = "localhost"; // For local testing
    }

    // Parse User Agent
    const userAgent = req.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";
    
    // Determine device type
    let deviceType = "Desktop";
    const device = parser.getDevice();
    if (device.type === "mobile") deviceType = "Mobile";
    if (device.type === "tablet") deviceType = "Tablet";

    // Try to get country
    let country = "Unknown";
    // First try Vercel header
    const vercelCountry = req.headers.get("x-vercel-ip-country");
    if (vercelCountry) {
      country = vercelCountry;
    } else if (ipAddress !== "localhost" && ipAddress !== "unknown") {
      // Fallback to IP API
      try {
        const ipRes = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const ipData = await ipRes.json();
        if (ipData.status === "success") {
          country = ipData.country;
        }
      } catch (e) {
        // Silently fail IP lookup
      }
    }

    // Upsert Visitor in Database
    // We update lastVisit to now(), and only increment visitCount if this is a new session?
    // The requirement says just "Visitor Analytics... Total Visitors".
    // For simplicity, we just upsert and update the lastVisit time.
    // If it's a new record, visitCount will be 1. If it exists, we just update lastVisit.
    
    await prisma.visitor.upsert({
      where: { visitorId },
      update: {
        ipAddress: ipAddress !== "localhost" ? ipAddress : undefined, // Keep real IP if testing locally and it was previously recorded
        lastVisit: new Date(),
        browser,
        device: deviceType,
        country: country !== "Unknown" ? country : undefined, // Don't overwrite known country with Unknown
      },
      create: {
        visitorId,
        ipAddress,
        country,
        device: deviceType,
        browser,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in tracking route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
