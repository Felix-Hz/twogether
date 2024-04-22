import { useLoginSetters } from "@/context";
import { RegisterForm } from "@/components/login";
import { IoArrowBackCircle } from "react-icons/io5";

export default function CompleteAccountContainer() {
  const { userEmail, setInitialLanding } = useLoginSetters();

  const handleBackClick = () => {
    setInitialLanding(true);
  };

  return (
    <section>
      <IoArrowBackCircle
        className="text-4xl cursor-pointer m-2 absolute left-3 top-3 md:left-10 md:top-10"
        onClick={handleBackClick}
      />

      <div className="space-y-2 text-center p-8">
        <h1 className="text-3xl font-bold">Complete your account</h1>
        <p className="text-gray-500 dark:text-gray-400 py-2">
          Signing up as{" "}
          <strong className="font-semibold inline">{userEmail}</strong>
        </p>

        <RegisterForm />
      </div>
    </section>
  );
}
