/* // Importamos PrismaClient desde el paquete de Prisma
import { PrismaClient } from "@prisma/client";

// Extendemos el objeto global para incluir nuestra instancia de Prisma
// Esto nos permite evitar que TypeScript arroje errores diciendo que `prismaGlobal` no existe en `globalThis`.
declare const globalThis: {
  prismaGlobal: PrismaClient | undefined; // Definimos prismaGlobal que puede ser una instancia de PrismaClient o undefined
} & typeof global;

// Definimos un tipo para el objeto 'user' basado en los campos que necesite para "fullName"
interface User {
  firstName: string;
  lastName: string;
}

// Creamos una instancia de PrismaClient o reutilizamos la instancia existente.
// Si globalThis.prismaGlobal ya tiene una instancia (en desarrollo), la reutilizamos para evitar crear múltiples conexiones.
// Si no existe, creamos una nueva instancia.
const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient().$extends({
    // $extends es una función que nos permite agregar lógica personalizada a Prisma.
    // En este ejemplo, añadimos una propiedad calculada `fullName` al modelo `user` que combina `firstName` y `lastName`.
    result: {
      user: {
        fullName: {
          // Definimos que necesitamos las propiedades `firstName` y `lastName` para calcular el nombre completo.
          needs: { firstName: true, lastName: true },
          // Esta función se ejecuta para devolver el nombre completo del usuario
          compute(user: User) {
            return `${user.firstName} ${user.lastName}`; // Unimos `firstName` y `lastName` para crear el nombre completo.
          },
        },
      },
    },
  });

// Si no estamos en producción (es decir, en desarrollo), guardamos la instancia de Prisma en `globalThis.prismaGlobal`
// Esto asegura que PrismaClient no se vuelva a instanciar en cada cambio de código durante el hot-reloading en desarrollo.
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// Exportamos la instancia de Prisma para que pueda ser utilizada en cualquier parte de nuestra aplicación.
export default prisma; */

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
