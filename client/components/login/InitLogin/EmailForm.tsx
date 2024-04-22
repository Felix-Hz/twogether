import { z } from "zod";
import { useSetters } from "@/context";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  var { setUserExists, setUserEmail, setInitialLanding } = useSetters();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "Please enter a valid email address." }),
  });

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
  });

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
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="Email"
          type="email"
          {...control.register("email")}
        />
      </div>
      <div className="space-y-2 pt-4">
        <Button className="w-full text-lg" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
