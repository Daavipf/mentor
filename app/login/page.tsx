import { handleLogin } from "@/lib/api/auth/actions";

export default function LoginPage() {
  return (
    <main style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Entrar na Conta</h2>
      <form action={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: "12px" }}>
        Não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </main>
  );
}
