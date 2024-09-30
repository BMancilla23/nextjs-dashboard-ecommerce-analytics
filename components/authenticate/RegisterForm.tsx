"use client";

import { RegisterAccount } from "@/server/actions/register";
import { RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "../navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AuthCard } from "./AuthCard";
import { FormError } from "./FormError";

export const RegisterForm = () => {
  // Manejamos la validación y los errores por defecto
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [error, setError] = useState<string>(""); // Estado para almacenar mensajes de error generales
  const [registerSuccess, setRegisterSuccess] = useState(false); // Estado para manejar la página de éxito

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado de carga

  const { execute } = useAction(RegisterAccount, {
    onSuccess(data) {
      // console.log(data.data?.error);
      if (data.data?.error) {
        setError(data.data.error); // Maneja el mensaje de error devuelto desde el servidor
      } else {
        setRegisterSuccess(true); // Si el registro es exitoso, mostrar la pantalla de éxito
        setError(""); // Limpiar errores si todo sale bien
        // Redirigir tras el registro exitos, a la página de login
        /* setTimeout(() => {
          router.push("/login");
        }, 3000); */
      }
    },

    onError() {
      // Manejamos cualquier error inesperado
      setError("An unexpected error ocurred. Please try again");
    },
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsSubmitting(true); // Desactivar el formulario durante el envío

    try {
      execute(values); // Ejecutar la acción de registro
    } finally {
      setIsSubmitting(false); // Reactivar el botón después del envío
    }
  };

  return (
    <>
      {registerSuccess ? (
        <div className="mt-48 gap-8 flex flex-col items-center text-center">
          <div className="self-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold w-full">
            Thanks for your registration
          </h1>
          <div className="flex flex-col gap-1 items-center w-full">
            <span>
              You will be notified by email once your account is ready
            </span>
            <span>Please allow 2-3 business days for response</span>
          </div>
          <Button
            size={"sm"}
            variant="link"
            className="mb-5 self-center"
            onClick={() => setRegisterSuccess(false)}
          >
            Go back to registration
          </Button>
        </div>
      ) : (
        <AuthCard
          title="Register for an account"
          backButtonHref="/login"
          backButtonLabel="Already have an account?"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="username"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {/*    <FormDescription>
                    Well send you a confirmation email to this address.
                  </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {/* <FormDescription>
                    Your password should be at least 8 characters long and contain
                    at least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
              </div>
              {/* Botón de registro */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </AuthCard>
      )}
    </>
  );
};
