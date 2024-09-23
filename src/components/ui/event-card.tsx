import { Star } from "lucide-react"
import {Link} from "react-router-dom"
import moment from "moment"
const EventCard = ({ event}: {
    event : any
}) => {

    const title: string = event?.title;
    const slug = event?.slug

    const ticketPrice: number = 1500;
    const dateOfEvent = moment(event.dateOfEvent, "YYYY-MM-DD");
    const day = moment(dateOfEvent, "YYYY-MM-DD").date();
    const month = moment(moment(event.dateOfEvent, "YYYY-MM-DD").month(), "M").format("MMMM").slice(0, 3);


    return (
        <Link to={`/events/${slug}`} state={{event: event}} className="border border-slate-500 rounded-md w-full max-w-sm">
            <div className="relative">
                <img src="https://citizentv.obs.af-south-1.myhuaweicloud.com/111511/conversions/Sauti-og_image.webp" alt="" width="100%" height="100%" className="rounded-t-md" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
                <h1 className="text-white absolute bottom-0 z-20 text-3xl p-5">{title}</h1>
            </div>
            <div className="flex bg-blue-950 p-5 gap-5 rounded-b-md relative">
                <button type="button" title="Add to Wishlist" className="absolute z-50 -top-5 right-2 text-white bg-slate-500 p-2 rounded-full grid place-items-center"><Star /></button>
              <div className="flex flex-col gap-2.5">
                    <div className="flex gap-5">
                        <div className="text-white text-3xl text-center font-bold">
                            <p>{month}</p>
                            <span>{day}</span>
                        </div>
                        <div>
                            <p className="text-white text-xl font-semibold">{moment(event.dateOfEvent).format("LLL")}</p>
                            <div className="flex flex-col text-slate-300 *:text-xl">
                                <span>{event?.location.venue}</span>
                                <span>{event?.location.address.county}</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-white text-2xl font-bold">
                        {ticketPrice.toLocaleString("en", {
                            style: "currency",
                            currency: "KES"
                        })}
                    </span>
              </div>
            </div>
           
        </Link>
    )
}

export default EventCard