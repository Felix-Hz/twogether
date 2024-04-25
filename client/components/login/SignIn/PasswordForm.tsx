import { z } from "zod";
// import { hash } from "bcryptjs";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMsg } from "@/components/login";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalSetters, useLoginSetters } from "@/context";

const PORT = process.env.DJANGO_API_PORT || "8000";
const API_ADDRESS =
  process.env.DJANGO_API_ADDRESS || `http://localhost:${PORT}`;

export default function Form() {
  const {
    userEmail,
    showInvalid,
    passwordVisible,
    setShowInvalid,
    setPasswordVisible,
  } = useLoginSetters();
  const { setJwtToken } = useGlobalSetters();

  const formSchema = z.object({
    password: z.string().min(1, { message: "This field has to be filled." }),
  });

  const { handleSubmit, control, watch } = useForm({
    resolver: zodResolver(formSchema),
  });

  const passwordNotNull = watch("password") && watch("password").length > 0;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: Record<string, any>) => {
    // const hashedPassword = await hash(data.password, 10);
    // data["password"] = hashedPassword;
    data["email"] = userEmail;

    // @TODO: Encrypt password when travelling to the server.
    try {
      const response = await fetch(`${API_ADDRESS}/user/signin/`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      /* ==============================
    * @NOTE: API returns status code. *
    ================================= */
      if (response.ok) {
        const responseData = await response.json();
        setShowInvalid(false);
        setJwtToken(responseData.access_token);
      } else {
        setShowInvalid(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 relative">
        <Input
          id="password"
          placeholder="Password"
          type={passwordVisible ? "text" : "password"}
          {...control.register("password")}
        />
        <div className="z-5 p-2 bg-white hover:cursor-pointer absolute top-3 right-2 transform -translate-y-1/2">
          {passwordNotNull ? (
            passwordVisible ? (
              <TbEyeClosed
                onClick={togglePasswordVisibility}
                className="text-xl text-black/50"
              />
            ) : (
              <TbEye
                onClick={togglePasswordVisibility}
                className="text-xl text-black/50"
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="space-y-2 pt-4">
        {showInvalid ? (
          <ErrorMsg validationError={"Invalid credentials"} />
        ) : (
          ""
        )}
        <Button className="w-full text-lg" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
