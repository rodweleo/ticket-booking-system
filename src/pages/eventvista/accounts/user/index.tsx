import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { MyEvents } from "./pages/events"
import { MyTickets } from "./pages/tickets"
import { EventPage } from "./pages/events/event"
import { useUsers } from "../../../../hooks/useUsers"

export const UserAccount = () => {
    const { signOut } = useUsers()
    const navigate = useNavigate()
    const handleSignOut = () => {
        signOut();
        navigate("/login")
    }
    return <main className="flex w-full h-screen fixed">
        <nav id="user-main-nav-bar" className="bg-blue-900/50 w-56 h-screen pl-2 pt-5 flex flex-col justify-between">
            <ul className="w-full font-bold text-xl space-y-4">
                <li><NavLink to="events"><i className="fa-solid fa-calendar-check"></i> Events</NavLink></li>
                <li ><NavLink to="tickets"><i className="fa-solid fa-ticket"></i> My Tickets</NavLink></li>
            </ul>

            <ul>
                <li><button className="m-2 w-full font-bold text-xl bg-red-300 p-2.5 rounded-md text-red-600" onClick={() => handleSignOut()}><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button></li>
            </ul>
        </nav>

        <section className="px-2.5 w-full overflow-y-auto">
            <Routes>
                <Route path="events/*">
                    <Route index element={<MyEvents />} />
                    <Route path=":id" element={<EventPage />} />
                </Route>
                <Route path="tickets" element={<MyTickets />}></Route>
            </Routes>
        </section>
    </main>
}