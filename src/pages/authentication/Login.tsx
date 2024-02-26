import { FieldValues, useForm } from "react-hook-form"
import { TextField } from "../../components/TextField"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                if (user) {
                    navigate("/");
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

            });
    }
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: FieldValues) => console.log(data)
    return <section className="flex flex-col w-screen h-screen justify-center items-center">
        <h1>Welcome back to <span className="text-blue-900 font-bold">EventVista</span></h1>
        <div className="h-8"></div>
        <form className="bg-slate-100 p-5 rounded-md w-96" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold">Sign In</h1>
            <div className="h-4"></div>
            <TextField options={{ label: "Email Address", type: "email", placeHolder: "abc.gmail.com", leadingIcon: "fa-regular fa-envelope scale-105" }} />
            <div className="h-2"></div>
            <TextField options={{ label: "Password", type: "password", placeHolder: "********", leadingIcon: "fa-solid fa-key scale-105" }} />
            <div className="h-4"></div>
            <div className="flex justify-end">
                <button className="bg-blue-900 text-white px-10 py-2.5 rounded-md">Sign In</button>
            </div>

            <div className="h-4"></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-slate-400">or</p>
                <div className="h-4"></div>
                <button onClick={() => handleGoogleSignIn()} type="button" className="w-full justify-center flex bg-slate-200 hover:bg-slate-300 gap-1 p-2 rounded-md"> <img src="/images/google.png" alt="" loading="lazy" height="25" width="25" />Continue with Google</button>
            </div>
            <div className="h-8"></div>
            <p className="text-center">Don't have an account? <Link to="register" className="text-blue-900 font-bold">Sign Up</Link></p>
        </form>
    </section>
}