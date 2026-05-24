import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { handleLogout } from "@/lib/api/auth/actions";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const user = token ? verifyJwt(token) : null;

  return (
    <section style={{ padding: "40px" }}>
      <h1>Dashboard Privado</h1>
      <p>
        Bem-vindo, <strong>{user?.name}</strong>!
      </p>

      <Link href="/dashboard/exams">Área de provas</Link>

      <form action={handleLogout} style={{ marginTop: "20px" }}>
        <button type="submit">Sair da Conta</button>
      </form>
    </section>
  );
}
