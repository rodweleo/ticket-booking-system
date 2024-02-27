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

  const reserveTickets = (tickets) => {
    //CHECK IF THE REQUEST HAS REGULAR TICKETS
    if (tickets.regular > 0 && tickets.vip > 0) {
      //GENERATE THE REGULAR TICKETS
      for (let i = 0; i < tickets.regular; i++) {
        console.log("Regular ticket: " + i);
      }
      for (let j = 0; j < tickets.vip; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        console.log("VIP ticket: " + j);
      }
    } else if (tickets.vip > 0) {
      for (let j = 0; j < tickets.vip; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        console.log("VIP ticket: " + j);
      }
    } else if (tickets.regular > 0) {
      for (let j = 0; j < tickets.regular; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        console.log("Regular ticket: " + j);
      }
    }
    
  };

  return { tickets, reserveTickets };
};
