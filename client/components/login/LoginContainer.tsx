"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BaseLogin,
  WelcomeBackContainer,
  CompleteAccountContainer,
} from "@/components/login";

import { useLoginSetters } from "@/context";

export default function LoginContainer() {
  const { userExists, initialLanding } = useLoginSetters();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm space-y-4 px-4 py-8 rounded-lg md:max-w-full md:p-24">
        {(userExists || initialLanding) && (
          <Image
            src="/images/logo_red.svg"
            alt="Twogether Logo"
            width={120}
            height={120}
            className="m-auto"
          />
        )}

        {initialLanding && <BaseLogin />}
        {userExists && !initialLanding && <WelcomeBackContainer />}
        {!userExists && !initialLanding && <CompleteAccountContainer />}

        {/* ==========================
                    TERMS&COND
            ==========================*/}
        {!userExists && (
          <p className="text-gray-500 dark:text-gray-400 text-center text-xs py-3">
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
