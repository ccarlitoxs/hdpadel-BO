import { createContext, useEffect, useState } from "react";
import { User } from "../types/app.types";
import { firestore } from "../api/config";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";


type AuthContextProps = {
  user: User | null;
  setUserLogged: (user: User | null) => void;
  checkUser: () => void;
  signIn: (form: { username: string; password: string }) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  
  useEffect(() => {
    checkUser();
  }, [userLogged]);
  
  const checkUser = async () => {
    const savedUser = JSON.parse(localStorage.getItem("user") ?? "null");
    try {
      const response = await getDocs(
        query(
          collection(firestore, "usuarios"),
          where("username", "==", savedUser)
        )
      );

      if (response.docs.length !== 0) {
        const userId = response.docs[0].id;
        const user = response.docs[0].data() as User;

        localStorage.setItem("user", JSON.stringify({ ...user, id: userId }));
        setUserLogged?.({ ...user, id: userId });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const signIn = async (form: { username: string; password: string }) => {
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

  const signOut = async () => {
    localStorage.removeItem("user");
    setUserLogged?.(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userLogged,
        setUserLogged,
        checkUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
