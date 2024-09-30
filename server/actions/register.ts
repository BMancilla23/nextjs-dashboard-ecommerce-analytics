"use server";
import bcrypt from "bcryptjs";

import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import db from "../db";
import { revalidatePath } from "next/cache";

export const RegisterAccount = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    try {
      // Hash de la contraseña con el factor de costo establecido
      const userPassword = await bcrypt.hash(password, 10);

      // Verificar si el usuario existe
      const existingUser = await db.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        // Mensaje genérico para no exponer detalles sobre la existencia del correo
        return { error: "Email already in use!" };
      }

      // Crear el nuevo usuario
      await db.user.create({
        data: {
          username: name,
          name: name,
          email: email,
          hashedPassword: userPassword,
        },
      });

      // Revalidar la caché para mantener actualizada la UI
      revalidatePath("/");

      // Retornar un mensaje de éxito
      return { success: true };
    } catch (error) {
      // Retornar un mensaje de error genérico sin exponer detalles del backend
      return {
        error: "An error ocurred during registration. Please try again",
      };
    }
  });
