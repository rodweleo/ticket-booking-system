import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
const getEvents = async () => {
    const q = query(collection(db, "events"));

    const querySnapshot = await getDocs(q);

    // Convert the query snapshot to an array of events
    const events: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return events;
}

export default getEvents;