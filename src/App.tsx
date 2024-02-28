import "./App.css"
import { Route, Routes, useNavigate } from "react-router"
import { LandingPage } from "./pages/eventvista/landing"
import { Account } from "./pages/account"
import { useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
export const App = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext)

  useEffect(() => {
    if (userContext) {
      navigate("/account")
    }
  }, [])
  return <main >
    <Routes>
      <Route path="/*" element={<LandingPage />}></Route>
      <Route path="/account/*" element={<Account />}></Route>
    </Routes>
  </main >
}