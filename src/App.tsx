import "./App.css"
import { useEffect } from "react"
import { Route, Routes } from "react-router"
import { LandingPage } from "./pages/eventvista/landing"
import { Account } from "./pages/account"
export const App = () => {

  useEffect(() => {
    const handleClickEvent = (event) => {
      const target = event.target;
      const mainNavLinks = document.getElementsByClassName("main-nav-link");

      // Remove "active" class from all navigation links
      for (let i = 0; i < mainNavLinks.length; i++) {
        mainNavLinks[i].classList.remove("active");
      }

      // Add "active" class to the clicked link
      target.classList.add("active");
    };

    const mainNavLinks = document.getElementsByClassName("main-nav-link");

    // Add click event listener to each navigation link
    for (let i = 0; i < mainNavLinks.length; i++) {
      mainNavLinks[i].addEventListener("click", handleClickEvent);
    }
  }, [])

  return <main >
    <Routes>
      <Route path="/*" element={<LandingPage />}></Route>
      <Route path="/account/*" element={<Account />}></Route>
    </Routes>
  </main >
}