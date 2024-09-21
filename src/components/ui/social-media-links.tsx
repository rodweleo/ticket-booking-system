import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const SocialMediaLinks = () => {
    return (
        <ul className="*:text-white *:text-3xl flex gap-4">
            <li><FaInstagram /></li>
            <li><FaXTwitter /></li>
            <li><FaWhatsapp /></li>
        </ul>
    )
}

export default SocialMediaLinks