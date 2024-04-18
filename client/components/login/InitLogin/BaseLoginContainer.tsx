import { EmailForm, OAuth } from "@/components/login";
import { Separator } from "@/components/ui/separator";

export default function Form() {
  return (
    <section>
      {/* ==========================
                    Logo&Title
            ==========================*/}
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

      <p className="text-center text-gray-600/75 font-semibold py-2">or</p>

      {/* ==========================
                FORM HANDLING
            ==========================*/}
      <EmailForm />
    </section>
  );
}
