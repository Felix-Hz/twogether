import { SetterProvider } from "@/context";
import { LoginContainer } from "@/components/login";

export default function LoginRoute() {
  return (
    <SetterProvider>
      <LoginContainer />
    </SetterProvider>
  );
}
