import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { NavBar } from '../../components/ui/NavBar';
import { AuthContext } from '../../context/AuthContext';
import { Events } from '../homepage/pages/events';
import { Profile } from '../profile';
import { Tickets } from '../tickets';


export const Account = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (authContext.currentUser === null) {
            navigate("/login")
        }
    }, [])

    return <main className="flex flex-1 overflow-hidden">
        <NavBar />
        <Routes>
            <Route path="events" element={<Events />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="profile" element={<Profile />} />
        </Routes>

    </main>
};

