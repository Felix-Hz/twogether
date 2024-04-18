import { useSetters, PasswordForm } from "@/components/login";

export default function WelcomeBackLoginContainer() {
  const { userEmail } = useSetters();
  return (
    <section>
      <div className="space-y-2 text-center p-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 py-2">
          Logging in as <p className="font-semibold inline">{userEmail}</p>
        </p>

        <PasswordForm />
      </div>
    </section>
  );
}
