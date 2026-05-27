import RegisterForm from "@/components/forms/register-form/registerForm";

export default function RegisterPage() {
  return (
    <section className="h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <h2 className="mb-4 text-2xl">Crie sua conta!</h2>
      <RegisterForm />
      <p style={{ marginTop: "12px" }}>
        Já tem conta?{" "}
        <a href="/login" className="text-blue-500 dark:text-blue-700">
          Entre aqui.
        </a>
      </p>
    </section>
  );
}
