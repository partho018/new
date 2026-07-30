import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Query database for the admin
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin && admin.password === password) {
      // Create JWT token
      const secret = new TextEncoder().encode(JWT_SECRET);
      const alg = "HS256";

      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: "lax",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
