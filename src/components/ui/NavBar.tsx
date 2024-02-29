import { NavLink, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';


export const NavBar = () => {
    const { signOut } = useUsers();
    const navigate = useNavigate();

    const logout = () => {
        signOut(),
            navigate("/login")
    }
    return <nav id="admin-main-nav-bar" className='bg-blue-900/50 w-56 h-screen pl-2 pt-5 flex flex-col justify-between'>
        <ul className='space-y-4'>
            <li><NavLink to="events"><i className="fa-regular fa-calendar-check scale-105 text-white"></i> Events</NavLink></li>
            <li><NavLink to="tickets"><i className="fa-solid fa-ticket text-white scale-105"></i> Tickets</NavLink></li>
        </ul>

        <ul className='flex flex-col gap-2'>
            <li > <button onClick={() => logout()} className='m-2 w-full font-bold text-xl bg-red-300 p-2.5 rounded-md text-red-600'><i className="fa-solid fa-arrow-right-from-bracket text-red-900"></i> Sign out</button></li>
        </ul>

    </nav>
}