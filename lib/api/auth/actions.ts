"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authService } from "../main";

const EXP_2_HOURS = 60 * 60 * 2;

export type ActionState = {
  success?: boolean;
  error?: string;
} | null;

export async function handleLogin(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Preencha todos os campos" };
  }
  try {
    const token = await authService.authenticateUser(email, password);
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: EXP_2_HOURS,
    });
  } catch (error: any) {
    //console.error(error);
    return { success: false, error: error.message || "Erro do servidor" };
  }

  redirect("/dashboard");
}

export async function handleRegister(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return { success: false, error: "Preencha todos os campos" };
  }

  try {
    const token = await authService.registerUser(name, email, password, confirmPassword);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: EXP_2_HOURS,
    });
  } catch (error: any) {
    //console.error(error);
    return { success: false, error: error.message || "Erro do servidor" };
  }

  redirect("/dashboard");
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
