import { FieldValues, useForm } from "react-hook-form"
import { TextField } from "../../components/TextField"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import LoginForm from "@/components/ui/login-form";
const SignIn = () => {
    const { signIn, errorSigningIn } = useUsers();
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                //create a new session token
                sessionStorage.setItem("eventvista-access-token", JSON.stringify(user.uid));
                navigate("/account");
            }).catch((error) => {
                throw error;
            });
    }
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data: FieldValues) => {
        const response = await signIn(data)
        if (response) {
            navigate("/account")
        } else {
            alert(errorSigningIn.message)
        }
    }
    return (
        <main className="grid place-items-center h-screen">
        <form className=" p-5 rounded-md w-96 hidden" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold">Sign In</h1>
            <div className="h-4"></div>
            <TextField options={{ name: "emailAddress", register, label: "Email Address", type: "email", placeHolder: "abc.gmail.com", leadingIcon: "fa-regular fa-envelope scale-105" }} />
            <div className="h-2"></div>
            <TextField options={{ name: "password", register, label: "Password", type: "password", placeHolder: "********", leadingIcon: "fa-solid fa-key scale-105" }} />
            <div className="h-4"></div>
            <div className="flex justify-end">
                <button className="bg-blue-900 text-white px-10 py-2.5 rounded-md">Sign In</button>
            </div>

            <div className="hidden">
                <div className="h-4"></div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-slate-600 font-bold">or</p>
                    <div className="h-4"></div>
                    <button onClick={() => handleGoogleSignIn()} type="button" className="w-full justify-center flex bg-slate-200 hover:bg-slate-300 gap-1 p-2 rounded-md"> <img src="/images/google.png" alt="" loading="lazy" height="25" width="25" />Sign in with Google</button>
                </div>
            </div>
            <div className="h-8"></div>
            <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-900 font-bold">Sign Up</Link></p>
        </form>
        <LoginForm />
    </main>
    )
}

export default SignIn