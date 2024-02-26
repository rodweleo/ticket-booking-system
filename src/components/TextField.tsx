interface TextFieldProps {
    label?: string,
    type: string,
    leadingIcon?: string,
    placeHolder?: string,
    defaultValue?: string | number
}

interface OptionsTypes {
    options: TextFieldProps
}
export const TextField: React.FC<OptionsTypes> = ({ options }) => {
    return <div className="w-full">
        <label htmlFor="">{options.label}</label>
        <div className="rounded-md focus-within:border border-blue-900 flex items-center gap-2 bg-slate-200 w-auto p-2.5 justify-between">
            <i className={options.leadingIcon}></i>
            <input type={options.type} placeholder={options.placeHolder} className="bg-transparent outline-0 w-full" value={options.defaultValue} />
        </div>

    </div>
}