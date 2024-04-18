"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BaseLogin,
  useSetters,
  WelcomeBackContainer,
} from "@/components/login";

export default function LoginContainer() {
  const { userExists, initialLanding } = useSetters();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm space-y-4 px-4 py-8 bg-gray-100/70 rounded-lg md:max-w-full md:p-24">
        <Image
          src="/images/logo_red.svg"
          alt="Twogether Logo"
          width={120}
          height={120}
          className="m-auto"
        />

        {initialLanding && <BaseLogin />}

        {userExists && !initialLanding && <WelcomeBackContainer />}

        {/* ==========================
                    TERMS&COND
            ==========================*/}
        {!userExists && (
          <p className="text-gray-500 dark:text-gray-400 text-center text-xs py-4">
            By signing up, you are creating a Twogether account and agree to our{" "}
            <Link className="font-semibold" href="#">
              Terms and Privacy Policy.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
