"use client";

import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/api/actions/AuthActions";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200">
      <div className="w-full flex justify-between">
        <Link href="/dashboard">
          <ArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl">Configurações</h1>
      </div>

      <div className="flex flex-col gap-4 p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Aparência</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Personalize a interface do sistema.</p>
        </div>

        <ThemeSwitch />
      </div>

      <div className="mt-auto flex w-full">
        <Button className="w-full" size={"lg"} onClick={handleLogout} variant="destructive">
          Sair
        </Button>
      </div>
    </section>
  );
}
