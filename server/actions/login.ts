"use server";

import { actionClient } from "@/lib/safe-action";

import db from "../db";
import { LoginSchema } from "@/types/login-schema";
import { signIn } from "../auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const LoginAccount = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      // Verificar si el usuario existe
      const existingUser = await db.user.findUnique({
        where: { email: email },
      });

      if (existingUser?.email !== email) {
        return { error: "Email not found" };
      }

      // Verificar si la cuenta está aprobada por un administrador

      if (!existingUser.isApproved) {
        return { error: "Must get approved by an admin" };
      }

      // Intentar iniciar sesión con las credenciales
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { error: "Invalid email or password" };
      }

      // Si el usuario no tiene una imagen de perfile, redirigir a la página de onboarding
      if (existingUser.image === "no-image") {
        return redirect("/onboarding");
      }
      // Redirigir a la página principal si todo es correcto
      redirect("/");
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid email or password" };
          case "AccessDenied":
            return { error: error.message };
        }
      }
      throw error;
    }
  });

revalidatePath("/");
