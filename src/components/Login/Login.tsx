import { User } from "../../types/app.types";
import { LoginView } from "./LoginView";
import { firestore } from "../../api/config";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";

interface LoginProps {
  setUserLogged?: (user: User) => void;
}

export const Login = ({ setUserLogged }: LoginProps) => {
  const onLogin = async (form: { username: string; password: string }) => {
    try {
      const response = await getDocs(
        query(
          collection(firestore, "usuarios"),
          where("username", "==", form.username)
        )
      );
      if (response.docs.length !== 0) {
        const userId = response.docs[0].id;
        const user = response.docs[0].data() as User;

        if (user.has_create_pass) {
          if (user.password === "" && form.password !== "") {
            await setDoc(doc(firestore, "usuarios", userId), {
              ...user,
              password: form.password,
              has_create_pass: false,
            });
          } else {
            alert("Debe crear una contraseña");
            return;
          }
        }

        if (user.password !== form.password) {
          alert("Contraseña incorrecta");
          return;
        }

        localStorage.setItem("user", JSON.stringify({ ...user, id: userId }));
        setUserLogged?.({ ...user, id: userId });
      } else {
        alert("Usuario no encontrado");
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return <LoginView onLogin={onLogin} />;
};
