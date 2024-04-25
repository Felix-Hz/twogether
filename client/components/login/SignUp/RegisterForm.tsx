"use client";

import { z } from "zod";
// import { hash } from "bcryptjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginSetters } from "@/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMsg } from "@/components/login";
import { Button } from "@/components/ui/button";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  const router = useRouter();

  const {
    userEmail,
    passwordVisible,
    confirmPasswordVisible,
    setUserCreated,
    setPasswordVisible,
    setconfirmPasswordVisible,
  } = useLoginSetters();

  const formSchema = z
    .object({
      full_name: z.string().min(1, { message: "What should we call you?" }),
      password: z
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
    .refine((data) => data.password === data.password2, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const passwordNotNull = watch("password") && watch("password").length > 0;
  const confirmPasswordNotNull =
    watch("password2") && watch("password2").length > 0;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setconfirmPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: Record<string, any>) => {
    // const hashedPassword = await hash(data.password, 10);
    // data["password"] = hashedPassword;
    delete data.password2;
    data["email"] = userEmail;
    const body = JSON.stringify(data);

    // @TODO: Encrypt password when travelling to the server.
    const response = await fetch(`${API_ADDRESS}/user/signup/`, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    /* ================================
    * @NOTE: API returns status code. *
    ================================= */
    if (response.status === 201) {
      setUserCreated(true);
      router.push("/dashboard");
    } else {
      console.error(`Error ${response.status}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <div className="space-y-2 pb-3">
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
          <ErrorMsg validationError={errors.full_name.message?.toString()} />
        )}
      </div>
      <div className="space-y-2 pb-3 relative">
        <Label
          htmlFor="password"
          className="block text-left font-semibold text-md"
        >
          Create a password
        </Label>
        <Input
          id="password"
          placeholder="New password"
          type={passwordVisible ? "text" : "password"}
          {...control.register("password")}
        />
        <div className="z-5 p-1 bg-white hover:cursor-pointer absolute top-8 right-2">
          {passwordNotNull ? (
            passwordVisible ? (
              <TbEyeClosed
                onClick={togglePasswordVisibility}
                className="text-xl text-black/50"
              />
            ) : (
              <TbEye
                onClick={togglePasswordVisibility}
                className="text-xl text-black/50"
              />
            )
          ) : (
            ""
          )}
        </div>
        {errors.password && (
          <ErrorMsg validationError={errors.password.message?.toString()} />
        )}
      </div>
      <div className="space-y-2 pb-3 relative">
        <Label
          htmlFor="password2"
          className="block text-left font-semibold text-md"
        >
          Confirm password
        </Label>
        <Input
          id="password2"
          placeholder="Confirm password"
          type={confirmPasswordVisible ? "text" : "password"}
          {...control.register("password2")}
        />
        <div className="z-5 p-1 bg-white hover:cursor-pointer absolute top-8 right-2">
          {confirmPasswordNotNull ? (
            confirmPasswordVisible ? (
              <TbEyeClosed
                onClick={toggleConfirmPasswordVisibility}
                className="text-xl text-black/50"
              />
            ) : (
              <TbEye
                onClick={toggleConfirmPasswordVisibility}
                className="text-xl text-black/50"
              />
            )
          ) : (
            ""
          )}
        </div>
        {errors.confirmPassword && (
          <ErrorMsg
            validationError={errors.confirmPassword.message?.toString()}
          />
        )}
      </div>
      <div className="space-y-2 pt-2">
        <Button className="w-full text-lg" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
