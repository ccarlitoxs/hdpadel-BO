import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login/Login";
import { Calendar } from "./components/Calendar/Calendar";

const AppState = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>{loading ? <div>Cargando...</div> : !user ? <Login /> : <Calendar />}</>
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <AppState />
      </AuthProvider>
    </>
  );
}

export default App;
