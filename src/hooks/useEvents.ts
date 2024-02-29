import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import { Event, Ticket } from "../utils/interfaces";

export const useEvents = () => {
  const userContext = useContext(UserContext);
  const [events, setEvents] = useState<Event[] | null | undefined>([]);
  const [isFetchingEvents, setIsLoading] = useState(true);
  const [addingEventError, setAddingEventError] = useState({
    code: 0,
    message: "",
  });
  //RETRIEVING ALL THE EVENTS IN THE DATABASE
  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, "events"));

        const querySnapshot = await getDocs(q);

        // Convert the query snapshot to an array of chats
        const fetchedEvents: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        //FILTER THE EVENTS AS PER THE ONCE THAT HAVE NOT BEEN DELETED
        setEvents(fetchedEvents);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setEvents([]);
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  //DEFINING FUNCTIONS TO ADD, EDIT AND REMOVE EVENTS
  const addEvent = async (event: any) => {
    const eventData = {
      id: "",
      title: event.eventName,
      description: event.description,
      tickets: {
        types: {
          regular: {
            number: Number(event.numberOfRegularTickets),
            price: Number(event.regularTicketPrice),
          },
          vip: {
            number: Number(event.numberOfVIPTickets),
            price: Number(event.vipTicketPrice),
          },
        },
      },
      location: {
        venue: event.venue,
        address: {
          address: event.address,
          county: event.county,
        },
      },
      dateOfEvent: event.dateOfEvent,
      time: {
        from: event.from,
        to: event.to,
      },
      updatedOn: "",
      updatedBy: "",
      createdBy: userContext?.emailAddress,
      createdOn: moment().format("L HH:mm:ss"),
      isDeleted: false,
      deletedOn: "",
    };
    try {
      const docRef = await addDoc(collection(db, "events"), eventData);

      //AFTER ADDING THE EVENT SUCCESSFULLY, UPDATE THE ID OF THE DOCUMENT WITH THE DOCUMENT ID
      await updateDoc(doc(db, "events", docRef.id), {
        id: docRef.id,
      });
      return `Event has been added under id ${docRef.id}`;
    } catch (error: any) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      setAddingEventError({
        code: errorCode,
        message: errorMessage,
      });

      return null;
    }
  };

  const editEvent = async (event: any) => {
    const eventData = {
      id: event.id,
      title: event.eventName,
      description: event.description,
      tickets: {
        types: {
          regular: {
            number: Number(event.numberOfRegularTickets),
            price: Number(event.regularTicketPrice),
          },
          vip: {
            number: Number(event.numberOfVIPTickets),
            price: Number(event.vipTicketPrice),
          },
        },
      },
      location: {
        venue: event.venue,
        address: {
          address: event.address,
          county: event.county,
        },
      },
      dateOfEvent: event.dateOfEvent,
      time: {
        from: event.from,
        to: event.to,
      },
      updatedOn: moment().format("L HH:mm:ss"),
      updatedBy: userContext?.emailAddress,
      createdBy: userContext?.emailAddress,
      isDeleted: false,
    };
    try {
      await updateDoc(doc(db, "events", event.id), eventData);

      return `Event ${event.id} has been updated successfully.`;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        errorCode,
        errorMessage,
      };
    }
  };

  const deleteEvent = async (event: Event) => {
    try {
      await updateDoc(doc(db, "events", event.id), {
        isDeleted: true,
        deletedOn: moment().format("L HH:mm:ss"),
      });

      return `Event ${event.id} has been deleted.`;
    } catch (error: any) {
      //const errorCode = error.code;
      //const errorMessage = error.message;

      return null;
    }
  };

  const fetchEventTickets = async (event: Event) => {
    try {
      const q = query(
        collection(db, "tickets"),
        where("eventId", "==", event.id)
      );
      const querySnapshot = await getDocs(q);

      const eventTickets = querySnapshot.docs.map((snapshot) => {
        return snapshot.data();
      });

      if (eventTickets.length > 0) {
        return eventTickets as Ticket[];
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return {
    events,
    isFetchingEvents,
    addEvent,
    addingEventError,
    editEvent,
    deleteEvent,
    fetchEventTickets,
  };
};
