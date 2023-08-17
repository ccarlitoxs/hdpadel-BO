import { User } from "../types/app.types";
import { CalendarView } from "./CalendarView";

interface CalendarProps {
  setUserLogged?: (user: User | null) => void;
}

export const Calendar = ({setUserLogged}:CalendarProps) => {

  const onLogout = () => {
    localStorage.removeItem("user");
    setUserLogged?.(null);
  };
  return <CalendarView onLogout={onLogout}/>;
};
