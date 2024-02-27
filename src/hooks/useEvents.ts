import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import moment from "moment";

export const useEvents = () => {
  const [events, setEvents] = useState([]);

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

        setEvents(fetchedEvents);
      } catch (e) {
        console.error(e);
      }
    }

    fetchEvents();
  }, []);

  //DEFINING FUNCTIONS TO ADD, EDIT AND REMOVE EVENTS
  const addEvent = async (event) => {
    const docRef = await addDoc(collection(db, "events"), {
      id: "",
      title: event.name,
      dateOfEvent: moment().format("YYYY-mm-dd"),
    });

    if (docRef.id) {
      console.log("event added successfully");
    }
  };

  const editEvent = async (event) => {
    const docRef = await addDoc(collection(db, "events"), {
      id: "",
      title: event.name,
      dateOfEvent: moment().format("YYYY-mm-dd"),
    });

    if (docRef.id) {
      console.log("event added successfully");
    }
  };

  const deleteEvent = async (event) => {
    console.log(event);
  };

  return { events, addEvent, editEvent, deleteEvent };
};
