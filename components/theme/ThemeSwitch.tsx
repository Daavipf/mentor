"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-3">
      <Switch id="theme-mode" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
      <Label htmlFor="theme-mode" className="cursor-pointer font-medium">
        {isDark ? "Modo Escuro" : "Modo Claro"}
      </Label>
    </div>
  );
}
