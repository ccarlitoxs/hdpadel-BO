import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Login } from "./components/Login/Login";
import { Calendar } from "./components/Calendar/Calendar";

function App() {


  const { user } = useContext(AuthContext);

  return (
    <>
      {/* {!user ? (
        <Login />
      ) : ( */}
        <Calendar />
      {/* )} */}
    </>
  );
}

export default App;
