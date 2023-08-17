import { useEffect, useState } from "react";
import { firestore } from "./api/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "./types/app.types";
import { Login } from "./components/Login/Login";
import { Calendar } from "./components/Calendar";

function App() {
  const savedUser = JSON.parse(localStorage.getItem("user") ?? "null");
  const [userLogged, setUserLogged] = useState<User | null>(savedUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocs(
          query(
            collection(firestore, "usuarios"),
            where("username", "==", userLogged)
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

    if (userLogged) {
      fetchData();
    }
  }, [userLogged]);

  return (
    <>
      {!userLogged ? (
        <Login setUserLogged={setUserLogged} />
      ) : (
        <Calendar setUserLogged={setUserLogged} />
      )}
    </>
  );
}

export default App;
