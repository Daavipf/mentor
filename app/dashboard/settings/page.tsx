import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/api/auth/actions";

export default function SettingsPage() {
  return (
    <section className="h-full flex flex-col p-4 bg-zinc-100 dark:bg-zinc-950">
      <h1>Página de configurações</h1>
      <Button onClick={handleLogout}>Sair</Button>
    </section>
  );
}
