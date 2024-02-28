import { ReactNode } from "react";
import { UserContext } from "../context/UserContext";
import { useUsers } from "../hooks/useUsers";


interface UserProviderProps {
  children: ReactNode;
}


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { activeUser } = useUsers();

  return <UserContext.Provider value={activeUser}>{children}</UserContext.Provider>;
};
