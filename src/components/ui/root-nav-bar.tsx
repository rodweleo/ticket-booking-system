import { NavLink } from "react-router-dom"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"

const RootNavBar = () => {

    const navigate = useNavigate();
    return (
        <header className="container flex items-center w-full justify-between sticky top-0 z-50 py-10">
            <NavLink to="/" className="text-white font-bold">
                <h1 className="text-3xl">Lyte</h1>
            </NavLink>
            <nav className="flex *:text-2xl items-center justify-around text-white">
                <ul className="flex items-center gap-10">
                    <li><NavLink to="/" className="main-nav-link">Home</NavLink></li>
                    <li><NavLink to="events" className="main-nav-link">Events</NavLink></li>
                </ul>
            </nav>
            <ul className="flex items-center gap-10">
                <li><Button className="bg-blue-900 hover:bg-blue-600 px-12 text-xl py-6 rounded-full" onClick={() => navigate("/sign-in")}>Sign In</Button></li>
            </ul>
        </header>
    )
}

export default RootNavBar