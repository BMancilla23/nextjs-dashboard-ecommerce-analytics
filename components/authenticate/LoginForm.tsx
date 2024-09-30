"use client";

import { LoginAccount } from "@/server/actions/login";
import { LoginSchema } from "@/types/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export const LoginForm = () => {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(LoginAccount, {
    onSuccess(data) {
      // console.log(data.data?.error);
      if (data.data?.error) {
        setError(data.data.error); // Mostrar el manejo de error devuelto desde el backend
      }
    },
    onError() {
      setError("An unexpected error ocurred. Please try again");
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await execute(values);
  };

  return (
    <AuthCard
      title="Welcome Back!"
      backButtonHref="/register"
      backButtonLabel="Create a new account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
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
                      autoComplete="email"
                      disabled={status === "executing"}
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
                      autoComplete="current-password"
                      disabled={status === "executing"}
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
          <Button
            type="submit"
            className="mt-8 w-full"
            disabled={status === "executing"}
          >
            {status === "executing" ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};
