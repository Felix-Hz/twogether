import { LoginSetterProvider } from "@/context";
import { LoginContainer } from "@/components/login";

export default function LoginRoute() {
  return (
    <LoginSetterProvider>
      <LoginContainer />
    </LoginSetterProvider>
  );
}
