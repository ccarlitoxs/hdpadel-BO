import { useState } from "react";
import { StyledContainer } from "./LoginView.styles";
import { useForm } from "../../hooks/useForm";
import { useResponsiveMap } from "../../hooks/useResponsiveManager";
import { InputPresets } from "../UI";

interface LoginViewProps {
  onLogin?: (form: { username: string; password: string }) => void;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  const { isDesktop } = useResponsiveMap();

  const { form, onChange } = useForm({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    username: false,
  });

  const handleLogin = () => {
    if (form.username === "") {
      setFormErrors({
        username: form.username === "",
      });
      return;
    }
    onLogin?.(form);
  };

  return (
    <StyledContainer isDesktop={isDesktop}>
      <h1 className="HEADER__Title">HD Padel</h1>
      <InputPresets.TextInput
        className="LOGIN__Input-Text"
        placeholder="Usuario"
        containerProps={{
          className: `LOGIN__Input ${
            formErrors["username"] ? "LOGIN__Input-Error" : ""
          }`,
        }}
        onChange={(event) => onChange(event.target.value, "username")}
        value={form.username}
      />
      <InputPresets.TextInput
        className="LOGIN__Input-Text"
        placeholder="Contraseña"
        containerProps={{
          className: `LOGIN__Input ${
            formErrors["password"] ? "LOGIN__Input-Error" : ""
          }`,
        }}
        onChange={(event) => onChange(event.target.value, "password")}
        value={form.password}
        type="password"
      />
      <button className="LOGIN__Button" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </StyledContainer>
  );
};
