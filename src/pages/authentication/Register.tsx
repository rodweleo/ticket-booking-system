import { FieldValues, useForm } from "react-hook-form"
import { TextField } from "../../components/TextField"
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

export const Register = () => {
    const { createAccount, errorCreatingAccount } = useUsers();
    const navigate = useNavigate()
    const handleGoogleSignUp = () => {
        //FIRST LOGIN WITH THE GOOGLE AUTH PROVIDER
        
    }
    const { register, handleSubmit } = useForm()

    //SIGNINGG UP USING EMAIL AND PASSWORD
    const submitAccountDetails = async (data: FieldValues) => {
        if (data.password === data.confirmPassword) {
            await createAccount(data).then(() => {
                navigate("/login")
            })

            if (errorCreatingAccount.message.length > 0) {
                alert(errorCreatingAccount.message)
            }
        } else {
            alert("Passwords do not match")
        }
    }

    return <section className="flex flex-col w-screen h-screen justify-center items-center">
        <h1 className="text-white font-bold text-2xl">Create your <span className="text-blue-900 font-bold">EventVista</span> account.</h1>
        <div className="h-8"></div>
        <form className="bg-slate-100 p-5 rounded-md w-96" onSubmit={handleSubmit(submitAccountDetails)}>
            <h1 className="font-bold">Sign In</h1>
            <div className="h-4"></div>
            <TextField options={{ name: "fullName", register, label: "Full Name", type: "text", placeHolder: "Full Name", leadingIcon: "fa-solid fa-user scale-105 text-slate-500" }} />
            <div className="h-4"></div>
            <TextField options={{ name: "phoneNumber", register, label: "Phone Number", type: "tel", placeHolder: "07********", leadingIcon: "fa-solid fa-phone scale-105 text-slate-500" }} />
            <div className="h-2"></div>
            <TextField options={{ name: "emailAddress", register, label: "Email Address", type: "email", placeHolder: "abc.gmail.com", leadingIcon: "fa-regular fa-envelope scale-105 text-slate-500" }} />
            <div className="h-2"></div>
            <TextField options={{ name: "password", register, label: "Password", type: "password", placeHolder: "********", leadingIcon: "fa-solid fa-key scale-105 text-slate-500" }} />
            <div className="h-4"></div>
            <TextField options={{ name: "confirmPassword", register, label: "Confirm Password", type: "password", placeHolder: "********", leadingIcon: "fa-solid fa-key scale-105 text-slate-500" }} />
            <div className="h-4"></div>
            <div className="flex justify-end">
                <button className="bg-blue-900 text-white px-10 py-2.5 rounded-md">Sign Up</button>
            </div>

            <div className="h-4"></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-slate-400">or</p>
                <div className="h-4"></div>
                <button onClick={() => handleGoogleSignUp()} type="button" className="w-full justify-center flex bg-slate-300  hover:bg-slate-400 gap-1 p-2 rounded-md"> <img src="/images/google.png" alt="" loading="lazy" height="25" width="25" />Sign up with Google</button>
            </div>
            <div className="h-8"></div>
            <p className="text-center"> Already have an account? <Link to="/login" className=" text-blue-900 font-bold">Sign In</Link></p>
        </form>
    </section>
}