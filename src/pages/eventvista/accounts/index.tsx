import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"
import { Route, Routes, useNavigate } from "react-router"
import { AdminAccount } from "./admin"
import { UserAccount } from "./user"

export const Account = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {

        if (userContext?.role === "admin") {
            navigate("admin")
        } else {
            navigate("user")
        }
    }, [])


    return (<main>
        <Routes>
            <Route path="admin/*" element={<AdminAccount />} />
            <Route path="user/*" element={<UserAccount />} />
        </Routes>
    </main>)
}