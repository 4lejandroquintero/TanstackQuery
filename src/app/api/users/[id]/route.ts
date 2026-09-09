import { NextResponse } from "next/server";
import { deleteUser, getUserById } from "@/lib/users-store";

type Params = { params: Promise<{ id: string }> };

/**
 * Dynamic Route Handler: /api/users/[id]
 * En Next 15+ params es Promise — hay que await.
 */
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

  const ok = await deleteUser(userId);
  if (!ok) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
