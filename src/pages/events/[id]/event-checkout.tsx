import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useLocation} from "react-router-dom"
// import { contractKit } from "@/utils/contract-kit"
import { mento } from "@/utils/mento"
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { providers, utils } from "ethers";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const EventCheckout = () => {
    const [account, setAccount] = useState<string>();
    const { sdk, connected, chainId } = useSDK();
    const location = useLocation();
    const {event, tickets, attendees} = location.state;
    const [pair, setPair] = useState<string[]>([])
    const connectWithMetamask = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const testing = async () => {
        const pairs = await mento.getTradeablePairs();
        setPair(pairs[0])
        // const accounts = await contractKit.web3.eth.getAccounts();
        // console.log(accounts)
    }

    const getQuotation = async () => {
        const cUsdAddress = pair[0].address;
        const cKesAddress = pair[1].address;
        const tokenUnits = 18;
        const amountIn = utils.parseUnits("1500", tokenUnits);
       
        try {
            const quoteAmountOut = await mento.getAmountOut(cKesAddress, cUsdAddress, amountIn);
            console.log(`~${utils.formatUnits(
                quoteAmountOut,
                tokenUnits
            )} cUSD needed to buy 1500 CELO`);
        } catch (error) {
            console.error("Error getting quote:", error);
            // Handle the error appropriately (e.g. display a user-friendly message)
        }
    }

    console.log(pair)

    

    return (
        <main className="container space-y-10">
            <section>
                <h1 className="text-white text-2xl font-bold">Your Details</h1>
                <p className="text-slate-300 text-lg">The email address and Phone Number you provide will be used to send you your ticket details. Ensure they are correct.</p>
            </section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" text-white flex items-center justify-between gap-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+234 800 000 0000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                </form>
            </Form>

            <section className="bg-blue-500/30 p-5 rounded-lg space-y-4">
                <h1 className="text-white text-2xl font-bold px-5">Booking Summary</h1>
                <table className="table booking-summary-table">
                    <tbody>
                        <tr>
                            <th>Event Name: </th>
                            <td>{event.title}</td>
                        </tr>
                        <tr>
                            <th>Ticket Price: </th>
                            <td>{0}</td>
                        </tr>
                        <tr>
                            <th>Tickets: </th>
                            <td>{tickets}</td>
                        </tr>
                        <tr>
                            <th>Attendees: </th>
                            <td>{attendees}</td>
                        </tr>
                        <tr>
                            <th>Total Amount: </th>
                            <td>{0}</td>
                        </tr>
                    </tbody>
                </table>

            </section>

            <section className="bg-blue-500/30 p-5 rounded-lg space-y-4">
                <h1 className="text-white text-2xl font-bold">Payment Methods</h1>
                <ul>
                    <li>
                        <div className="space-y-4">
                            <h2 className="text-xl text-white">Pay with  Stablecoins (cUSD/cEUR)</h2>
                            <Button onClick={connectWithMetamask}>Connect Wallet</Button>
                            {connected && (
                                <div className="text-slate-300 font-bold text-2xl">
                                    <>
                                        {chainId && `Connected chain: ${chainId}`}
                                        <p></p>
                                        {account && `Connected account: ${account}`}
                                    </>
                                </div>
                            )}
                            <p className="text-slate-300">You will be charged in cUSD or cEUR, the stablecoins of Celo.</p>
                        </div>
                    </li>
                </ul>
            </section>

            <Button onClick={getQuotation} type="button" className="w-full mt-4 border-4 border-blue-900 text-white bg-transparent hover:bg-blue-800 py-7 text-lg">CONTINUE TO PAYMENT</Button>
            <p className="text-slate-300 text-sm text-center mt-4">By purchasing this ticket, you agree to out <span className="text-blue-900">Events Disclaimers</span> and <span className="text-blue-900">Privacy Policy</span></p>
        </main>
    )



}

export default EventCheckout;