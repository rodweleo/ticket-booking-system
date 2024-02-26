import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const NavBar = () => {
    const authContext = useContext(AuthContext);
    const user = authContext.currentUser;

    return <nav className='h-screen flex flex-col justify-between bg-black/50 w-32 text-white'>
        <ul className='space-y-4'>
            <li><NavLink to="home"><i className="fa-solid fa-house text-white scale-105"></i> Home</NavLink></li>
            <li><NavLink to="events"><i className="fa-regular fa-calendar-check scale-105 text-white"></i> Events</NavLink></li>
            <li><i className="fa-solid fa-ticket text-white scale-105"></i><NavLink to="tickets"> Tickets</NavLink></li>
        </ul>

        <ul className='flex flex-col gap-2'>
            <li><i className="fa-solid fa-gear text-white 105"></i> <NavLink to="settings">Settings</NavLink></li>
            <li><NavLink to="profile" className="flex gap-4 items-center"><img src={user?.photoURL} alt="" loading='lazy' className='rounded-full w-10' /> <i className="fa-solid fa-angle-right"></i></NavLink></li>
        </ul>

    </nav>
}