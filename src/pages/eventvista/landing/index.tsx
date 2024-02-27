import { Routes, Route } from "react-router"
import { Account } from "../../account"
import { Login } from "../../authentication/Login"
import { Register } from "../../authentication/Register"
import { MainNavBar } from "../../../pages/eventvista/widgets/main-nav-bar"
import { HomePage } from "../../homepage"
import { EventPage } from "../../homepage/pages/events/event"

import { Events } from "../../homepage/pages/events"

export const LandingPage = () => {
    return <main className="p-10 h-screen">
        <MainNavBar />
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="events" >
                <Route index element={<Events />}></Route>
                <Route path=":id" element={<EventPage />} />
            </Route>

            <Route path="account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>

    </main>
}