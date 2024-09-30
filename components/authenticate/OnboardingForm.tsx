"use client";

import { Session } from "next-auth";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OnboardingSchema } from "@/types/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { UploadDropzone } from "@/app/api/uploadthing/upload";
import { useState } from "react";
import { FormError } from "./FormError";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Onboarding } from "@/server/actions/onboarding";

type OnboardingFormProps = {
  session: Session;
};

export const OnboardingForm = ({ session }: OnboardingFormProps) => {
  const user = session.user;
  const router = useRouter();
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");

  // console.log(user);

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      image: "",
      location: "",
    },
  });

  if (user?.image !== "no-image") {
    redirect("/");
  }

  const { execute, status } = useAction(Onboarding, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      } else {
        setError("");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof OnboardingSchema>) => {
    execute(values);
    setError("");
    if (status == "hasSucceeded") {
      router.replace("/");
    }
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <Card className="p-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-center flex-col items-center gap-2">
              <h1>Hey {user?.name}</h1>
              <span className="text-sm text-center flex justify-center mb-5">
                We need a title bit more information
              </span>
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please Provide Location</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Lima, Perú" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem>
                  <FormLabel>Upload an Image</FormLabel>
                  <div className="flex gap-4 sm:flex-row flex-col justify-center items-center">
                    {!form.getValues("image") && (
                      <div className="relative w-32 h-32 aspect-square overflow-hidden rounded-full mt-2">
                        <Image
                          fill
                          src="/default-image.png"
                          className="object-cover"
                          alt="image default"
                        />
                      </div>
                    )}
                    {form.getValues("image") && (
                      <div className="relative w-32 h-32 aspect-square overflow-hidden rounded-full mt-2">
                        <Image
                          fill
                          src={form.getValues("image")!}
                          className="object-cover"
                          alt="image default"
                        />
                      </div>
                    )}
                    <UploadDropzone
                      endpoint="imageUploader"
                      onUploadBegin={() => {
                        setImageUploading(true);
                      }}
                      onUploadError={(error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        return;
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        setImageUploading(false);
                        return;
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button
              type="submit"
              disabled={status === "executing" || imageUploading}
            >
              Go to dashboard
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
