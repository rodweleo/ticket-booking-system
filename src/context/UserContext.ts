import { createContext } from "react";
import { User } from "../utils/interfaces";

export const UserContext = createContext<User | null | undefined>(null);
