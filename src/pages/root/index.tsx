import { Routes, Route } from "react-router"
import { HomePage } from "../homepage"
import RootNavBar from "@/components/ui/root-nav-bar"
import SignIn from "@/pages/authentication/sign-in"
import { EventPage } from "../events/[id]/event"
import {Events} from "../events"
import EventCheckout from "../events/[id]/event-checkout"
import CoinSwap from "@/pages/coinswap"

const Root = () => {

    return (
        <main>
            <RootNavBar />
            <section className="min-h-screen overflow-y-auto">
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="events" >
                        <Route index element={<Events />} />
                        <Route path=":id">
                            <Route index element={<EventPage />} />
                            <Route path="checkout" element={<EventCheckout/>} />
                        </Route>
                    </Route>
                    <Route path="coin-swap" element={<CoinSwap />} />
                    <Route path="sign-in" element={<SignIn />} />
                </Routes>
            </section>
        </main>
    )
}

export default Root