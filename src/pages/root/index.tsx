import { Routes, Route } from "react-router"
import { HomePage } from "../homepage"
import RootNavBar from "@/components/ui/root-nav-bar"
import RootFooter from "@/components/ui/root-footer"
import SignIn from "@/pages/authentication/sign-in"
import { EventPage } from "../events/[id]/event"
import {Events} from "../events"

const Root = () => {

    return (
        <main className="min-h-screen ">
            <RootNavBar />
            <section className="min-h-screen">
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="events" >
                        <Route index element={<Events />} />
                        <Route path=":id/*" element={<EventPage />} />
                    </Route>
                </Routes>
            </section>
            <RootFooter />
        </main>
    )
}

export default Root