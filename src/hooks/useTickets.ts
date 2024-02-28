import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { Ticket, Event } from "../utils/interfaces";
import moment from "moment";
import { UserContext } from "../context/UserContext";

export const useTickets = () => {
  const userContext = useContext(UserContext);
  const [tickets, setTickets] = useState<Ticket[] | null>([]);
  const [userTickets, setUserTickets] = useState<Ticket[] | null>([]);
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

  const reserveTickets = async (event: Event, tickets: any) => {
    const data = {
      id: "",
      eventId: event.id,
      eventName: event.title,
      ownerId: userContext?.id,
      owner: userContext?.name,
      isValid: true,
      isRevoked: false,
      revokedOn: "",
      revokedBy: "",
      isDeleted: false,
      deletedBy: "",
      deletedOn: "",
      createdAt: moment().format("l HH:mm:ss"),
      createdBy: userContext?.emailAddress,
      expiresBy: `${event.dateOfEvent} ${event.time.to}`,
    };

    const generatedTickets = [];
    const errors = [];
    const successes = [];

    //CHECK IF THE REQUEST HAS REGULAR TICKETS
    if (tickets.regular > 0 && tickets.vip > 0) {
      //GENERATE THE REGULAR TICKETS THEN GENERATE THE VIP TICKETS
      for (let j = 0; j < tickets.regular; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        generatedTickets.push({
          ...data,
          type: "Regular",
          price: event.tickets.types.regular.price,
        });
      }

      for (let j = 0; j < tickets.vip; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        generatedTickets.push({
          ...data,
          type: "VIP",
          price: event.tickets.types.vip.price,
        });
      }
    } else if (tickets.vip > 0) {
      generatedTickets.push({
        ...data,
        type: "VIP",
        price: event.tickets.types.vip.price,
      });
    } else if (tickets.regular > 0) {
      for (let j = 0; j < tickets.regular; j++) {
        //CREATE A PROMISE FOR EACH TICKET TO SAVE THE TICKET
        generatedTickets.push({
          ...data,
          type: "Regular",
          price: event.tickets.types.regular.price,
        });
      }
    }

    //FOR EACH OF THE TICKETS, THEY NEED TO BE STORED IN THE DATABASE
    for (const ticket of generatedTickets) {
      try {
        const docRef = await addDoc(collection(db, "tickets"), ticket);

        //UPDATE THE ID OF THE TICKETS IN THE DOCUMENT
        await updateDoc(doc(db, "tickets", docRef.id), {
          id: docRef.id,
          updatedOn: moment().format("L HH:mm:ss"),
          updatedBy: userContext?.emailAddress,
        });

        const feedback = `Ticket ${docRef.id} reserved successfully.`;
        successes.push(feedback);

        //ONCE THE TICKETS HAVE BEEN CREATED, DEDUCT THE NUMBER OF TICKETS FOR THAT GIVEN EVENT
        await updateDoc(doc(db, "events", event.id), {
          tickets: {
            types: {
              regular: {
                number: tickets.regular
                  ? event.tickets.types.regular.number - tickets.regular
                  : event.tickets.types.regular.number,
                price: event.tickets.types.regular.price,
              },
              vip: {
                number: tickets.vip
                  ? event.tickets.types.vip.number - tickets.vip
                  : event.tickets.types.vip.number,
                price: event.tickets.types.vip.price,
              },
            },
          },
          updatedBy: userContext?.emailAddress,
          updatedOn: moment().format("L HH:mm:ss"),
        });
      } catch (error) {
        errors.push(error);
      }
    }

    return { successes, errors };
  };

  const fetchUserTickets = async (userId: string) => {
    try {
      const q = query(
        collection(db, "tickets"),
        where("ownerId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      } else {
        const fetchedTickets = querySnapshot.docs.map((ticket) => {
          return ticket.data();
        });

        setUserTickets(fetchedTickets);

        return fetchedTickets;
      }
    } catch (error) {
      return [];
    }
  };

  return { tickets, reserveTickets, fetchUserTickets, userTickets };
};
