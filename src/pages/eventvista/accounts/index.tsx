import { useContext, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { AdminAccount } from "./admin"
import { UserAccount } from "./user"
import { useUsers } from "../../../hooks/useUsers"
import { AuthContext } from "../../../context/AuthContext"

export const Account = () => {
    const { fetchUserById } = useUsers()
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);


    useEffect(() => {
        if (authContext.currentUser) {
            fetchUserById(authContext.currentUser.uid).then((activeUser) => {
                if (activeUser) {
                    if (activeUser.role === "admin") {
                        navigate("admin")
                    } else if (activeUser.role === "user") {
                        navigate("user")
                    }
                } else {
                    navigate("/login")
                }
            })
        }

    }, [])


    return (<main>
        <Routes>
            <Route path="admin/*" element={<AdminAccount />} />
            <Route path="user/*" element={<UserAccount />} />
        </Routes>
    </main>)
}