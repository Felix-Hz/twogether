import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSetters } from "@/components/login";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  const { userEmail, setValidPassword, validPassword } = useSetters();

  const formSchema = z.object({
    password: z.string().min(1, { message: "This field has to be filled." }),
  });

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: Record<string, any>) => {
    data["email"] = userEmail;
    const body = JSON.stringify(data);

    // @TODO: Encrypt password when travelling to the server.
    const response = await fetch(`${API_ADDRESS}/user/signin/`, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    /* ================================
    * @NOTE: API returns status code. *
    ================================= */
    if (response.status === 200) {
      setValidPassword(true);
    } else {
      console.log("Wrong password, man!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...control.register("password")}
        />
      </div>
      <div className="space-y-2 pt-4">
        <p>{validPassword ? "Valid" : "Invalid"}</p>
        <Button className="w-full text-lg" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
