import { LoginForm } from "@/components/login-form";
import Login from "../../_components/buttons_google_github_login/Login";
//page d'acceuil pour connection 
//qui va nou dirige vers ()
export default function LoginPage() {
  return (
    
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
      <Login />
    </div>
  </div>
  );
}   