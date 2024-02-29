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
import { Ticket, Event, User } from "../utils/interfaces";
import moment from "moment";
import { sendTicketReservationMail } from "../utils/functions/sendTicketReservationMail";
import { AuthContext } from "../context/AuthContext";
import { useUsers } from "./useUsers";

export const useTickets = () => {
  const authContext = useContext(AuthContext);
  const { fetchUserById, setActiveUser } = useUsers();
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

  const fetchUserTickets = async (userId: string) => {
    try {
      const q = query(
        collection(db, "tickets"),
        where("ownerId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        return [];
      } else {
        const fetchedTickets: any = querySnapshot.docs.map((ticket) => {
          return ticket.data();
        });

        setUserTickets(fetchedTickets);

        return fetchedTickets;
      }
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    if (authContext.currentUser) {
      fetchUserById(authContext.currentUser!.uid).then((user) => {
        setActiveUser(user as User);
      });
      fetchUserTickets(authContext.currentUser.uid).then((response) => {
        setUserTickets(response);
      });
    }
  }, []);

  const reserveTickets = async (event: Event, tickets: any) => {
    const activeUser = await fetchUserById(authContext.currentUser!.uid);

    const data = {
      id: "",
      eventId: event.id,
      eventName: event.title,
      ownerId: activeUser?.id,
      owner: activeUser?.name,
      isValid: true,
      isRevoked: false,
      revokedOn: "",
      revokedBy: "",
      isDeleted: false,
      deletedBy: "",
      deletedOn: "",
      createdAt: moment().format("LL HH:mm:ss"),
      createdBy: activeUser?.emailAddress,
      expiresBy: `${event.dateOfEvent} ${event.time.to}`,
    };

    const generatedTickets = [];
    const errors = [];
    const successes = [];
    let emailSentResponse: string | null = "";
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
          updatedBy: activeUser?.emailAddress,
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
          updatedBy: activeUser?.emailAddress,
          updatedOn: moment().format("L HH:mm:ss"),
        });

        //AFTER RESERVING THE TICKETS, WE NEED TO SEND THE EMAIL TO THE USER WITH THE DETAILS OF THE ORDER THEY HAVE MADE
        const response = await sendTicketReservationMail({
          to: activeUser?.emailAddress,
          user: activeUser?.name,
          event: event.title,
          date: event.dateOfEvent,
          from_time: event.time.from,
          to_time: event.time.to,
          location: `${event.location.venue} ${event.location.address.address} ${event.location.address.county}`,
          regularTickets: tickets.regular ? tickets.regular : 0,
          vipTickets: tickets.vip ? tickets.vip : 0,
          regularTicketPrice: event.tickets.types.regular.price,
          vipTicketPrice: event.tickets.types.vip.price,
          totalAmount: tickets.totalAmount,
        });

        emailSentResponse = response;
      } catch (error) {
        errors.push(error);
      }
    }

    return { successes, errors, emailSentResponse };
  };

  return { tickets, reserveTickets, userTickets };
};
