import Link from "next/link";
import Image from "next/image";
import { EmailForm, OAuth } from "@/components/login";
import { Separator } from "@/components/ui/separator";

export default function Component() {
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
        <OAuth />

        <Separator />

        <p className="text-center text-gray-600/75 font-semibold">or</p>

        {/* ==========================
                FORM HANDLING
            ==========================*/}
        <EmailForm />

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
