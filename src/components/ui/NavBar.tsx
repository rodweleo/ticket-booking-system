import { NavLink, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';


export const NavBar = () => {
    const { signOut } = useUsers();
    const navigate = useNavigate();

    const logout = () => {
        signOut(),
            navigate("/login")
    }
    return <nav className='p-2.5 h-screen flex flex-col justify-between bg-blue-900/50 w-32 text-white'>
        <ul className='space-y-4'>
            <li><NavLink to="home"><i className="fa-solid fa-house text-white scale-105"></i> Home</NavLink></li>
            <li><NavLink to="events"><i className="fa-regular fa-calendar-check scale-105 text-white"></i> Events</NavLink></li>
            <li><i className="fa-solid fa-ticket text-white scale-105"></i><NavLink to="tickets"> Tickets</NavLink></li>
        </ul>

        <ul className='flex flex-col gap-2'>
            <li><i className="fa-solid fa-gear text-white 105"></i> <NavLink to="settings">Settings</NavLink></li>
            <li > <button onClick={() => logout()}><i className="fa-solid fa-arrow-right-from-bracket text-red-900"></i> Sign out</button></li>
        </ul>

    </nav>
}