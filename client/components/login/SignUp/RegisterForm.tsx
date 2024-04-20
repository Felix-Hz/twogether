"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetters, ValidationMsg } from "@/components/login";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  const { userEmail } = useSetters();

  const formSchema = z
    .object({
      full_name: z.string().min(1, { message: "What should we call you?" }),
      password1: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long." })
        .refine(
          (value) => {
            // NOTE: Complexity checks.
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasDigit = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
          },
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
          }
        ),
        password2: z.string(),
    })
    .refine((data) => data.password1 === data.password2, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: Record<string, any>) => {
    data["email"] = userEmail;
    const body = JSON.stringify(data);
    console.log(`body=${body}`);

    // // @TODO: Encrypt password when travelling to the server.
    // const response = await fetch(`${API_ADDRESS}/user/signup/`, {
    //   body,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    /* ================================
    * @NOTE: API returns status code. *
    ================================= */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <div className="space-y-2 pb-4">
        <Label
          htmlFor="full_name"
          className="block text-left font-semibold text-md"
        >
          Hi there! My name is
        </Label>
        <Input
          id="full_name"
          placeholder="Name"
          type="text"
          {...control.register("full_name")}
        />
        {errors.full_name && (
          <ValidationMsg
            validationError={errors.full_name.message?.toString()}
          />
        )}
      </div>
      <div className="space-y-2 pb-4">
        <Label
          htmlFor="password1"
          className="block text-left font-semibold text-md"
        >
          Create a password
        </Label>
        <Input
          id="password1"
          placeholder="New password"
          type="password"
          {...control.register("password1")}
        />
        {errors.password && (
          <ValidationMsg
            validationError={errors.password.message?.toString()}
          />
        )}
      </div>
      <div className="space-y-2 pb-4">
        <Label
          htmlFor="password2"
          className="block text-left font-semibold text-md"
        >
          Confirm password
        </Label>
        <Input
          id="password2"
          placeholder="Confirm password"
          type="password"
          {...control.register("password2")}
        />
        {errors.password2 && (
          <ValidationMsg
            validationError={errors.password2.message?.toString()}
          />
        )}
      </div>
      <div className="space-y-2 pt-4">
        <Button className="w-full text-lg" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}