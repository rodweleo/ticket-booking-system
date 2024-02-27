import { TextField } from "../../../../../components/TextField"

export const Footer = () => {
    return <footer className="flex flex-col w-full absolute mt-full">
        <section className="flex justify-between hidden">
            <h1 className="text-white font-bold">EventVista</h1>
            <ul>
                <h2 className="text-white font-bold">Contact Us</h2>
                <li className="flex items-center gap-2"><i className="fa-regular fa-envelope text-slate-500 font-bold"></i> <p className="text-white">theeventvista@gmail.com</p></li>
            </ul>
            <form className=" w-96 space-y-4">
                <div>
                    <h1 className="font-bold text-3xl text-white">Subscribe to Our Newsletter</h1>
                    <p className="text-slate-400 font-bold">Get the latest offer which is best tailored for you.</p>
                </div>
                <div className="space-y-2 ">
                    <TextField
                        options={{
                            label: "",
                            type: "email",
                            placeHolder: "abc@gmail.com"
                        }} />
                    <button type="button" className="text-white bg-blue-900 p-2.5 rounded-md">Subscribe  </button></div>
            </form>
        </section>
        <hr className="my-5" />
        <p className="text-slate-400 text-center">Copyright &copy; {new Date().getFullYear()} EventVista. All Rights Reserved.</p>
    </footer>
}