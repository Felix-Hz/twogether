import { z } from "zod";
import { TiDelete } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useLoginSetters } from "@/context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  var { setUserExists, setUserEmail, setInitialLanding } = useLoginSetters();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "Please enter a valid email address." }),
  });

  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(formSchema),
  });

  const emailValue = watch("email");

  const handleInputReset = () => {
    reset();
  };

  const onSubmit = async (data: Record<string, any>) => {
    const response = await fetch(`${API_ADDRESS}/user/check/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    /* ========================================================
    * @NOTE: API returns boolean validating user's existence. *
    ========================================================= */
    setUserEmail(data.email);
    setUserExists(responseData.exists);
    setInitialLanding(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 relative">
        <Input
          id="email"
          placeholder="Email"
          type="email"
          {...control.register("email")}
        />
        {emailValue && emailValue.length > 0 && (
          <TiDelete
            onClick={handleInputReset}
            className="text-xl text-black/50 hover:cursor-pointer absolute top-3 right-2 transform -translate-y-1/2"
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
