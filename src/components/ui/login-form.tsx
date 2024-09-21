import { LoginSchema } from "@/utils/schema"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form"
import { Input } from "./input"
import { Link } from "react-router-dom"
const LoginForm = () => {

    const loginForm = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof LoginSchema>) {

        console.log(values)
    }


    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="flex flex-col w-full">
                            <Button variant="outline" className="w-full" type="button">Sign in with Google</Button>
                        </div>
                        <p className="text-center text-slate-500">or</p>
                        <div className="space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="abc@example.com" {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col gap-5 w-full">
                            <Button type="submit" className="w-full">Sign In</Button>
                            <p>Don't have an account ? <Link to="/signup" className="text-blue-900 font-bold hover:underline">Create Account</Link></p>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default LoginForm