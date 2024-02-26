import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect, useState } from "react";

export const useTickets = () => {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    async function fetchTickets() {
      //RETRIEVE ALL THE TICKTS IN THE DATABASE
      try {
        const q = query(collection(db, "tickets"));

        //RETRIEVING THE TICKETS
        const querySnapshot = await getDocs(q);

        // Convert the query snapshot to an array of chats
        const fetchedTickets: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTickets(fetchedTickets);
      } catch (e) {
        console.error(e);
      }
    }
    fetchTickets();
  }, []);

  return { tickets };
};
