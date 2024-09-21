import { Search, ArrowRight, MapPin } from 'lucide-react';
import { Separator } from "./separator";
import { useState} from "react"
import { DatePickerWithRange } from './date-picker-with-picker';

const EventSearchBox = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

return (
    <div className="rounded-full bg-slate-800 w-3/4 h-16 bottom-5 flex justify-between py-2.5 px-2 items-center flex-wrap">
       <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-2 ml-2 w-[400px]">
                <Search className="text-slate-400" />
                <input type="text" placeholder="Search Events, Artists, Teams, and more" className="bg-transparent h-full outline-none text-white text-lg w-full" />
                <Separator orientation="vertical" className="h-full text-red-300 bg-red-400" />
            </div>
            <hr className="h-12 w-[1px] bg-slate-400" />
            <div className="flex items-center gap-2 ml-2">
                <MapPin className="text-slate-400" />
                <input type="text" placeholder="Nairobi, Kenya" className="bg-transparent h-full outline-none text-white text-lg w-[300px]" />
                <Separator orientation="vertical" className="h-full text-red-300 bg-red-400" />
            </div>
            <hr className="h-12 w-[1px] bg-slate-400" />
           
       </div>
        <button type="submit" title="Search" className="rounded-full bg-blue-500 size-14 grid place-items-center text-white"><ArrowRight /></button>
    </div>
)
}

export default EventSearchBox;