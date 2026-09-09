import { NextResponse } from "next/server";
import { createUser, getUsers } from "@/lib/users-store";
import type { CreateUserInput } from "@/lib/types";

/**
 * Route Handlers = "API routes" en App Router.
 * GET  /api/users  → lista
 * POST /api/users  → crear
 */
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateUserInput>;

    if (!body.name?.trim() || !body.email?.trim() || !body.role) {
      return NextResponse.json(
        { error: "name, email y role son obligatorios" },
        { status: 400 },
      );
    }

    const user = await createUser({
      name: body.name.trim(),
      email: body.email.trim(),
      role: body.role,
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
}
