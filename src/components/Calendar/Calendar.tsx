import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CalendarView } from "./CalendarView";

export const Calendar = () => {
  const { signOut } = useContext(AuthContext);

  
  
  return <CalendarView onLogout={signOut}/>;
};
