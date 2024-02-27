import { NavLink } from "react-router-dom"

export const MainNavBar = () => {
    return <nav id="main-nav-bar" className="flex items-center justify-between bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h1 className="text-white font-bold">EventVista</h1>
        <ul className="flex items-center gap-4">
            <li><NavLink to="/" className="main-nav-link">Home</NavLink></li>
            <li><NavLink to="events" className="main-nav-link">Events</NavLink></li>
        </ul>
        <ul className="flex space-x-4">
            <li><a className="border border-blue-900 p-2.5 bg-blue-900 text-white rounded-md hover:bg-blue-600 transition-all duration-300" href="login">Login</a></li>
            <li><a className="border border-blue-900 p-2.5 bg-blue-900/10 text-white rounded-md hover:bg-blue-600 transition-all duration-300" href="/events">Get a Ticket</a></li>

        </ul>
    </nav>
}