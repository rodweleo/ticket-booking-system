import { Separator } from "./separator"
import SocialMediaLinks from "@/components/ui/social-media-links"
const RootFooter = () => {
    return (
        <footer className="p-5  bg-slate-900 mt-10">
            <section className="container space-y-10">
            <section className="flex  justify-between">
                <div className="max-w-lg space-y-2.5">
                    <h1 className="font-bold text-white text-3xl">Lyte</h1>
                    <p className="text-slate-300 text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum eligendi id fugit officia consequuntur ullam, distinctio esse dolorem aspernatur perferendis natus sapiente illo fuga magni, accusamus eveniet exercitationem illum excepturi!</p>
                    <SocialMediaLinks/>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-white text-2xl font-bold">Quick Links</h1>
                    <ul className="text-slate-300 text-lg">
                        <li>Home</li>
                        <li>Events</li>
                        <li>Artists</li>
                        <li>Teams</li>
                    </ul>
                </div>
           </section>
           <Separator/>
           <section>
                <p className="text-white text-center text-lg">© {new Date().getFullYear()} Lyte. All rights reserved.</p>
           </section>
           </section>
        </footer>
    )
}

export default RootFooter