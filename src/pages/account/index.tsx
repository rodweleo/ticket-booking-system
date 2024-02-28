import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { NavBar } from '../../components/ui/NavBar';
import { Profile } from '../profile';
import { Tickets } from '../tickets';
import { EventList } from '../eventvista/admin/events/widgets/event-list';
import { useEvents } from '../../hooks/useEvents';
import { useUsers } from '../../hooks/useUsers';


export const Account = () => {
    const { activeUser } = useUsers();
    const { events } = useEvents()
    const navigate = useNavigate()

    useEffect(() => {
        if (activeUser === null) {
            navigate("/login")
        }
    }, [])

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

