import { Auth } from "firebase/auth";

import { createContext } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext<Auth>(auth);
