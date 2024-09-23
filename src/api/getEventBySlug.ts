import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../firebase/firebase.config";
const getEventBySlug = async (slug: string) => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    const event: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if(event.length > 0) {
        return event[0];
    }else{
        return null;
    }
}

export default getEventBySlug