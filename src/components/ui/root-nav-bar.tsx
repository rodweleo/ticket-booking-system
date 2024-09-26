import { NavLink } from "react-router-dom"
import { Button } from "./button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./dialog"
import { useAuth } from "./use-auth-client"
import { FaRegCircleUser } from "react-icons/fa6";
const RootNavBar = () => {
    const {connectWalletWithMetamask, connectedAccount} = useAuth()
    return (
        <header className="container flex items-center w-full justify-between sticky top-0 z-50 py-10">
            <NavLink to="/" className="text-white font-bold">
                <h1 className="text-3xl">Lyte</h1>
            </NavLink>
            <nav className="flex *:text-2xl items-center justify-around text-white">
                <ul className="flex items-center gap-10">
                    <li><NavLink to="/" className="main-nav-link">Home</NavLink></li>
                    <li><NavLink to="/coin-swap" className="main-nav-link">Coin Swap</NavLink></li>
                </ul>
            </nav>
            <ul className="flex items-center gap-10">
                <li>
                    {
                        connectedAccount ? <Button className="bg-blue-900 hover:bg-blue-800 px-12 text-xl py-6 rounded-full space-x-2 "><FaRegCircleUser /> <span>{connectedAccount.slice(0, 6)}...{connectedAccount.slice(connectedAccount.length - 4, connectedAccount.length)}</span></Button> : <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-900 hover:bg-blue-800 px-12 text-xl py-6 rounded-full">Connect Wallet</Button>
                            </DialogTrigger>
                            <DialogContent className="space-y-5">
                                <DialogHeader>
                                    <DialogTitle>Connect a Wallet</DialogTitle>
                                </DialogHeader>
                                <section>
                                    <ul>
                                        <li><Button onClick={connectWalletWithMetamask} variant="outline" className="text-xl py-6 w-full"><img src="/images/mm-logo.svg" alt="Continue with MetaMask" /></Button></li>
                                    </ul>
                                </section>
                            </DialogContent>
                        </Dialog>  
                    } 
                </li>
            </ul>
        </header>
    )
}

export default RootNavBar