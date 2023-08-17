import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoginView } from "./LoginView";

export const Login = () => {
  const { signIn } = useContext(AuthContext);

  return <LoginView onLogin={signIn} />;
};
