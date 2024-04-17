"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function Component() {
  const [email, setEmail] = useState("");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "Please enter a valid email address." }),
  });

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    const response = await fetch("http://127.0.0.1:8000/user/check/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm space-y-4 px-4 py-8 bg-gray-100/70 rounded-lg">
        {/* ==========================
                    Logo&Title
            ==========================*/}
        <Image
          src="/images/logo_red.svg"
          alt="Twogether Logo"
          width={120}
          height={120}
          className="m-auto"
        />
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log in or Sign up</h1>
          <p className="text-gray-500 dark:text-gray-400 py-2">
            Discover meaningful connections and shared experiences. Start
            exploring today! 🔗
          </p>
        </div>

        {/* ==========================
                    TODO: OAuth
            ==========================*/}
        <Button className="w-full" variant="outline">
          <FaGoogle className="text-lg" />
          <p className="inline m-1.5">Continue with Google</p>
        </Button>
        <Button className="w-full" variant="outline">
          <FaApple className="text-lg" />
          <p className="inline m-1.5">Continue with Apple</p>
        </Button>
        <Button className="w-full" variant="outline">
          <FaFacebook className="text-lg" />
          <p className="inline m-1.5">Continue with Facebook</p>
        </Button>

        <Separator />

        <p className="text-center text-gray-600/75 font-semibold">or</p>

        {/* ==========================
                FORM HANDLING
            ==========================*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2 pt-4">
            <Button className="w-full text-lg" type="submit">
              Continue
            </Button>
          </div>
        </form>


        {/* ==========================
                    TERMS&COND
            ==========================*/}
        <p className="text-gray-500 dark:text-gray-400 text-center text-xs py-4">
          By signing up, you are creating a Twogether account and agree to our{" "}
          <Link className="font-semibold" href="#">
            Terms and Privacy Policy.
          </Link>
        </p>
      </div>
    </div>
  );
}
