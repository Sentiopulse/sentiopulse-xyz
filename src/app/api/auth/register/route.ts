import { NextRequest, NextResponse } from "next/server";
import { createUser} from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }
    const { name, email, password } = result.data;
    const normalizedEmail = email;

    // Check if user already exists

    // Create new user
    const user = await createUser(normalizedEmail, password, name);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      (Array.isArray(error.meta?.target)
        ? (error.meta!.target as string[]).includes("email")
        : `${error.meta?.target ?? ""}`.includes("email"))
    ) {
      console.error("Prisma unique constraint violation (email)", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 409 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
