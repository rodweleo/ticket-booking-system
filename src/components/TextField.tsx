import { FieldValues, UseFormRegister } from "react-hook-form";

interface TextFieldProps {
    label?: string,
    name: string,
    type: string,
    leadingIcon?: string,
    placeHolder?: string,
    defaultValue?: string | number,
    register?: UseFormRegister<FieldValues>;
}

interface OptionsTypes {
    options: TextFieldProps
}
export const TextField: React.FC<OptionsTypes> = ({ options }) => {
    return <div className="w-full">
        <label htmlFor="" className="font-bold text-slate-500">{options.label}</label>
        <div className="rounded-md focus-within:border border-blue-900 flex items-center gap-2 bg-slate-300 w-auto p-2.5 justify-between">
            <i className={options.leadingIcon}></i>
            <input min={
                options.type === "date" ? new Date().toISOString().split('T')[0] : "number | undefined"
            }
                {...(options.register && options.register(options.name))} type={options.type} placeholder={options.placeHolder} className=" bg-transparent outline-0 w-full" defaultValue={options.defaultValue} />
        </div>

    </div>
}