import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { EventList } from './events/widgets/event-list';
import { useEvents } from '../../../../hooks/useEvents';
import { AuthContext } from '../../../../context/AuthContext';
import { NavBar } from '../../../../components/ui/NavBar';
import { Profile } from '../../../profile';
import { Tickets } from '../../../tickets';


export const AdminAccount = () => {
    const authContext = useContext(AuthContext)
    const { events } = useEvents()
    const navigate = useNavigate()

    useEffect(() => {
        if (authContext.currentUser === null) {
            navigate("/login")
        }
    }, [authContext])

    return <main className="flex flex-1 items-start overflow-hidden w-full">
        <NavBar />
        <main className='px-2.5 h-screen w-full'>
            <Routes>
                <Route path="events/*" element={<EventList events={events} />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </main>

    </main>
};

