import "./App.css"
import { Route, Routes } from "react-router"
import Root from "./pages/root"
import { Account } from "./pages/eventvista/accounts"
export const App = () => {

  return <main>
    <Routes>
      <Route path="/*" element={<Root />} />
      <Route path="account/*" element={<Account />} />
    </Routes >
  </main >
}