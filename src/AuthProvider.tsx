import { ReactNode } from "react"
import { AuthContext } from "./context/AuthContext"
import { getAuth } from "firebase/auth"

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = getAuth();


    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>

}