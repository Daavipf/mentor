import RegisterForm from "@/components/forms/register-form/registerForm";

export default function RegisterPage() {
  return (
    <section style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Criar nova conta</h2>
      <RegisterForm />
      <p style={{ marginTop: "12px" }}>
        Já tem conta? <a href="/login">Entre</a>
      </p>
    </section>
  );
}
