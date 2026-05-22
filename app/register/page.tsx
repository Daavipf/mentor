import { handleRegister } from "@/lib/api/auth/actions";

export default function RegisterPage() {
  return (
    <main style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Criar nova conta</h2>
      <form action={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="text" name="name" placeholder="Seu nome" required />
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Senha" required />
        <input type="password" name="confirmPassword" placeholder="Confirme a senha" required />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: "12px" }}>
        Já tem conta? <a href="/login">Entre</a>
      </p>
    </main>
  );
}
