import LoginForm from "@/components/forms/login-form/loginForm";

export default function LoginPage() {
  return (
    <main style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Entrar na Conta</h2>
      <LoginForm />
      <p style={{ marginTop: "12px" }}>
        Não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </main>
  );
}
