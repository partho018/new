import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, startOfMonth, subDays } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "All Time";
    const country = searchParams.get("country") || "All";

    const now = new Date();
    let startDate: Date | undefined;
    let isLiveFilter = false;

    // "Live" is visitors in the last 5 minutes
    const liveThreshold = new Date(now.getTime() - 5 * 60 * 1000);

    switch (filter) {
      case "Live":
        isLiveFilter = true;
        startDate = liveThreshold;
        break;
      case "Today":
        startDate = startOfDay(now);
        break;
      case "Last 7 Days":
        startDate = subDays(now, 7);
        break;
      case "Last 30 Days":
        startDate = subDays(now, 30);
        break;
      case "This Month":
        startDate = startOfMonth(now);
        break;
      case "All Time":
      default:
        startDate = undefined;
        break;
    }

    const whereClause: any = {};

    if (startDate) {
      whereClause.lastVisit = { gte: startDate };
    }
    
    if (country && country !== "All") {
      whereClause.country = country;
    }

    // Total Visitors (based on filter)
    const totalVisitors = await prisma.visitor.count({ where: whereClause });

    // Live Visitors (always calculate this globally or based on current country filter)
    const liveWhereClause: any = { lastVisit: { gte: liveThreshold } };
    if (country && country !== "All") liveWhereClause.country = country;
    const liveVisitors = await prisma.visitor.count({ where: liveWhereClause });

    // Visitors by Country
    const countryGroups = await prisma.visitor.groupBy({
      by: ["country"],
      where: whereClause,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } }
    });

    const countries = countryGroups.map((c) => ({
      country: c.country || "Unknown",
      count: c._count.id,
    }));

    // Visitors by Device
    const deviceGroups = await prisma.visitor.groupBy({
      by: ["device"],
      where: whereClause,
      _count: { id: true },
    });

    const devices = deviceGroups.map((d) => ({
      name: d.device || "Unknown",
      value: d._count.id,
    }));

    // Visitors by Browser
    const browserGroups = await prisma.visitor.groupBy({
      by: ["browser"],
      where: whereClause,
      _count: { id: true },
    });

    const browsers = browserGroups.map((b) => ({
      name: b.browser || "Unknown",
      value: b._count.id,
    }));

    // Recent Visitors List
    const recentVisitors = await prisma.visitor.findMany({
      where: whereClause,
      orderBy: { lastVisit: "desc" },
      take: 50, // Get top 50 recent visitors
    });

    // All available countries for the filter dropdown
    const allCountriesGroups = await prisma.visitor.groupBy({
      by: ["country"],
      where: { country: { not: null } },
    });
    const availableCountries = allCountriesGroups.map((c) => c.country).filter(Boolean);

    return NextResponse.json({
      totalVisitors,
      liveVisitors,
      countries,
      devices,
      browsers,
      recentVisitors,
      availableCountries,
    });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
