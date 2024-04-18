import { LoginContainer, SetterProvider } from "@/components/login";

export default function LoginRoute() {
  return (
    <SetterProvider>
      <LoginContainer />
    </SetterProvider>
  );
}
