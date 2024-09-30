import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/types/login-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validar los campos usando el schema de Zod
        const validatedFields = LoginSchema.safeParse(credentials);

        // Si la validación falla, retornamos null para indicar que no está autorizado
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // Buscar el usuario en la base de datos
        const user = await db.user.findUnique({
          where: { email },
        });

        // Si el usuario no existe o no tiene un hashedPassword, retornar null
        if (!user || !user.hashedPassword) return null;

        // Verificar la contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        // Si la contraseña coincide, devolver el usuario
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirige a esta página si el usuario no está autenticado
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt", // Usar JWT para las sesiones
  },
});
