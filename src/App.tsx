import "./App.css"
import { Route, Routes, useNavigate } from "react-router"
import { LandingPage } from "./pages/eventvista/landing"
import { useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import { Account } from "./pages/eventvista/accounts"
export const App = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext)

  useEffect(() => {
    if (userContext) {
      navigate("account")
    }
  }, [])
  return <main >
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="account/*" element={<Account />} />
    </Routes >
  </main >
}