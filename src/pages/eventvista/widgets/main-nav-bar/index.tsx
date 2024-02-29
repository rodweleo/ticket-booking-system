import { useEffect, useId } from "react";
import { NavLink } from "react-router-dom"

export const MainNavBar = () => {
    const mainNavBarId = useId();

    useEffect(() => {
        const handleClickEvent = (event: any) => {
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

    const toggleMainNavBar = () => {
        const mainNavBar = document.getElementById(mainNavBarId);
        mainNavBar?.classList.toggle("max-sm:hidden")
    }
    return <nav id="main-nav-bar" className="flex items-center justify-between bg-opacity-90 backdrop-filter backdrop-blur-lg z-50 top-0">
        <h1 className="text-white font-bold">EventVista</h1>
        <i className="fa-solid fa-bars text-white cursor-pointer md:hidden" onClick={() => toggleMainNavBar()}></i>
        <div className="w-1/2 flex items-center justify-between max-sm:hidden max-sm:flex max-sm:flex-col max-sm:gap-10 max-sm:fixed top-20 right-0 max-sm:w-full max-sm:bg-slate-900 max-sm:h-fit max-sm:py-10 z-50" id={mainNavBarId}>
            <ul className="flex items-center max-sm:flex-col gap-4">
                <li><NavLink to="/" className="main-nav-link">Home</NavLink></li>
                <li><NavLink to="events" className="main-nav-link">Events</NavLink></li>
            </ul>
            <ul className="flex max-sm:flex-col max-sm:items-center max-sm:gap-10 space-x-4">
                <li ><NavLink className="-z-50 border border-blue-900 p-2.5 bg-blue-900 text-white rounded-md hover:bg-blue-600 transition-all duration-300 max-sm:w-full" to="login">Login</NavLink></li>
                <li><NavLink className="border border-blue-900 p-2.5 bg-blue-900/10 text-white rounded-md hover:bg-blue-600 transition-all duration-300" to="login">Get a Ticket</NavLink></li>
            </ul>
        </div>
    </nav>
}