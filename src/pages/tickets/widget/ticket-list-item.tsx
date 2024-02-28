import moment from "moment"
import { useId } from "react";
import Status from "../../../components/ui/Status";

export const TicketListItem = ({ ticket, index }) => {
    const actionMenuId = useId();

    function toggleActionMenu() {
        document.getElementById(actionMenuId)?.classList.toggle("hidden")
    }
    return <tr key={index} className="text-center">
        <td>{index + 1}</td>
        <td>{ticket.id}</td>
        <td>{ticket.ownerId}</td>
        <td>{ticket.owner}</td>
        <td>{ticket.type}</td>
        <td>{ticket.price.toLocaleString("en", {
            style: "currency",
            currency: "KES"
        })}</td>
        <td>{moment(ticket.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
        <td>{moment(ticket.expiredBy).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
        <td><Status status={ticket.isValid} /> </td>
        <td className="relative"><i className="fa-solid fa-ellipsis-vertical cursor-pointer" onClick={() => toggleActionMenu()}></i>
            <ul className="absolute right-0 bg-slate-300 w-28 p-2.5 space-y-4 hidden" id={actionMenuId}>
                <li><button type="button"><i className="fa-solid fa-edit"></i> Edit</button>
                </li>
                <li><button type="button"><i className="fa-solid fa-cancel"></i> Revoke</button></li>
                <li><button type="button"><i className="fa-solid fa-trash"></i> Delete</button></li>
            </ul></td>
    </tr>
}