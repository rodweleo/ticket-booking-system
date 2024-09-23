import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
// import axios from "axios"
// import { useEffect } from "react"
import { NavLink } from "react-router-dom"
const AdminAccount = () => {

    

    // useEffect(() => {
    //     const getAccountBalance = async () => {
    //         try {
    //             const PRETIUM_API_KEY: string = import.meta.env.VITE_PRETIUM_API_KEY!;
    //             const res = await axios.post("https://pretium.africa/api/v1/payment/organization", null, {
    //                 headers: {
    //                     "api-key": PRETIUM_API_KEY
    //                 }
    //             })

    //             console.log(res)
    //         } catch (e) {
    //             console.log(e.response.data)
    //         }
    //     }
    //     // getAccountBalance()
    // }, [])
    return (
        <div className="h-screen fixed w-full">
            <header className="container mx-auto h-20 flex items-center">
                <nav>
                    <ul className="text-white font-bold">
                        <li>
                            <NavLink to="/" className="text-2xl">Swift</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <Separator/>
            <main className="flex  w-full">
                <aside className="w-[200px] text-white p-5 overflow-y-auto">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/accounts/admin">Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <Separator orientation="vertical" className="h-screen"/>
                <section className="container mx-auto py-10 overflow-y-auto">
                    <Card className="w-[400px]">
                        <CardHeader>
                            <CardTitle>0.00</CardTitle>
                            <CardDescription>Account Balance</CardDescription>
                        </CardHeader>
                    </Card>
                </section>
            </main>
            <footer></footer>
        </div>
    )
}

export default AdminAccount