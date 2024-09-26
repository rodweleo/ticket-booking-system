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
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { FaRegCopy } from "react-icons/fa";
import { RiCoinsFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import {utils} from "ethers"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const EventCheckout = () => {
    const location = useLocation();
    const {event, tickets, attendees} = location.state;

    const celoAddressRef = useRef<HTMLParagraphElement | null>(null)

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


    useEffect(() => {
        document.title = `Checkout | ${event.title}`
    }, [event])
    
    const copyCeloAddress = () => {
        if(celoAddressRef.current){
            navigator.clipboard.writeText(celoAddressRef.current.innerText).then(() => {
                toast.success('Celo address copied successfully!', {
                    theme: "colored"
                })
            }).catch((err) => {
                toast.error('Failed to copy Celo Address: ' + err, {
                    theme: "colored"
                })
            })
        } 
    }

    const getMentoExchangePairs = async () => {
        
    }

    const balanceInEther = utils.formatUnits("0x145f1ec87ddd0400", 18);
    console.log(balanceInEther)
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

            

            <Dialog>
                <DialogTrigger asChild>
                    <Button type="button" className="w-full mt-4 border-4 border-blue-900 text-white bg-transparent hover:bg-blue-800 py-7 text-lg">CONTINUE TO PAYMENT</Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Choose your Preferred Payment Method</DialogTitle>
                    </DialogHeader>
                    <section className="rounded-lg space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger><div className="flex items-center gap-5 text-lg"><RiCoinsFill size={20} /> Celo (USDC, cKES)</div></AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        <h1 className="font-bold text-xl">Payment Instructions</h1>
                                        <p className="text-lg">Please copy the following <strong>Celo address</strong> and transact the required amount to it. </p>
                                        <p className="text-lg">You are required to pay <strong>cKES 10.00 / USDC 0.58</strong></p>
                                        <p className="text-md"><strong>Note: </strong>Paying less or more than the required amount will result in a failed transaction</p>
                                        <Separator />
                                        
                                        <div>
                                            <div className="space-y-1">
                                                <p className="flex text-lg items-center justify-between"><strong>Celo Address:</strong> <button onClick={copyCeloAddress} className="text-blue-500 flex items-center gap-2"><FaRegCopy/> <span>Copy Address</span></button></p>
                                                <p className="text-bold text-lg font-bold text-blue-500" ref={celoAddressRef}>0x7f0813A544C8b3082da8E840AC951e83Fb9930bc</p>
                                            </div>
                                        </div>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                                <FormField
                                                    control={form.control}
                                                    name="transactionHash"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Transaction Hash</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="********************************" {...field} required />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button onClick={getMentoExchangePairs} type="button" className="bg-blue-900 hover:bg-blue-800 w-full text-lg py-7">Verify cKES 10.00 / USDC 0.58</Button>
                                            </form>
                                        </Form>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </DialogContent>
            </Dialog>
            <p className="text-slate-300 text-sm text-center mt-4">By purchasing this ticket, you agree to out <span className="text-blue-900">Events Disclaimers</span> and <span className="text-blue-900">Privacy Policy</span></p>
        </main>
    )



}

export default EventCheckout;