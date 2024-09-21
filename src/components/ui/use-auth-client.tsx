import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const useAuthClient = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    const register = () => {
        setIsAuthenticated(true)
    }


    return {
        isAuthenticated,
        user,
        login,
        logout,
        register
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuthClient()
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
