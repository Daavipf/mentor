import LoginForm from "@/components/forms/login-form/loginForm";

export default function LoginPage() {
  return (
    <section className="h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <h2 className="mb-4 text-2xl">Bem-vindo de volta!</h2>
      <LoginForm />
      <p style={{ marginTop: "12px" }}>
        Novo por aqui?{" "}
        <a href="/register" className="text-blue-500 dark:text-blue-700">
          Crie sua conta!
        </a>
      </p>
    </section>
  );
}
