import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CalendarView } from "./CalendarView";
import {
  Event,
  EventResponse,
  FixedEventResponse,
} from "../../types/app.types";
import { firestore } from "../../api/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { DateTime } from "luxon";

export const Calendar = () => {
  const { signOut } = useContext(AuthContext);

  const [events, setEvents] = useState<Event[]>([]);
  const [fixedEvents, setFixedEvents] = useState<Event[]>([]);

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [dateRange, setDateRange] = useState<{
    start: Date;
    end: Date;
  }>({ start: today, end: tomorrow });

  useEffect(() => {
    const q = query(
      collection(firestore, "turnos"),
      where("start_date", ">=", dateRange.start),
      where("start_date", "<", dateRange.end)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsResponse = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as EventResponse),
        id: doc.id,
      }));

      setEvents(
        eventsResponse.map((event) => ({
          id: event.id,
          title: event.owner,
          start: event.start_date?.toDate(),
          end: event.end_date?.toDate(),
          court: event.court,
          status: event.status,
          isFixedEvent: false,
          fixedEventId: event.confirm_shift_id,
        }))
      );
    });

    return unsubscribe;
  }, [firestore, dateRange]);

  useEffect(() => {
    const q = query(collection(firestore, "turnos_fijos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsResponse = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as FixedEventResponse),
        id: doc.id,
      }));

      if (eventsResponse.length > 0) {
        const diff = DateTime.fromJSDate(dateRange.end).diff(
          DateTime.fromJSDate(dateRange.start),
          "days"
        ).days;
        const mapedFixedEvents: Event[] = [];

        for (let i = 0; i < diff; i++) {
          const dateEvent = DateTime.fromJSDate(dateRange.start).plus({
            days: i,
          });
          const filteredEvents = eventsResponse.filter(
            (fixedEvent) => dateEvent.toFormat("E") === fixedEvent.day_of_week
          );

          for (const fixedEvent of filteredEvents) {
            const startEventDate = dateEvent.set({
              hour: Number(fixedEvent.start_time.split(":")[0]),
              minute: Number(fixedEvent.start_time.split(":")[1]),
            });

            const endEventDate = dateEvent.set({
              hour: Number(fixedEvent.end_time.split(":")[0]),
              minute: Number(fixedEvent.end_time.split(":")[1]),
            });

            mapedFixedEvents.push({
              id: fixedEvent.id,
              title: fixedEvent.owner,
              start: startEventDate.toJSDate(),
              end: endEventDate.toJSDate(),
              court: fixedEvent.court,
              isFixedEvent: true,
            });
          }
        }

        setFixedEvents(mapedFixedEvents);
      }
    });

    return unsubscribe;
  }, [firestore, dateRange]);

  const onSaveEvent = async (_event: Event) => {
    //Validaciones
    if (!_event?.start || !_event?.end) {
      alert("Debe ingresar una fecha de inicio y fin");
      return;
    }

    const isEventOverlapping = events.some(
      (event) =>
        event.id !== _event.id &&
        event.court === _event.court &&
        ((_event.start! >= event.start! && _event.start! < event.end!) ||
          (_event.end! > event.start! && _event.end! <= event.end!))
    );

    if (isEventOverlapping) {
      alert("El turno se superpone con otro turno");
      return;
    }

    if (_event.id) {
      if (_event.isFixedEvent) {
        if (_event.status === "confirmed") {
          try {
            await addDoc(collection(firestore, "turnos"), {
              court: _event.court,
              end_date: _event.end,
              owner: _event.title,
              start_date: _event.start,
              status: _event.status,
              confirm_shift_id: _event.id,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          try {
            const eventDoc = doc(firestore, "turnos_fijos", _event.id);
            await updateDoc(eventDoc, {
              start_date: _event.start,
              end_date: _event.end,
              court: _event.court,
              status: _event.status,
            });
          } catch (e) {
            console.error("Error editing document: ", e);
          }
        }
      } else {
        const eventDoc = doc(firestore, "turnos", _event.id);
        await updateDoc(eventDoc, {
          owner: _event.title,
          start_date: _event.start,
          end_date: _event.end,
          court: _event.court,
          status: _event.status,
        });
      }
    } else {
      if (_event.isFixedEvent) {
        const isEventFixedOverlapping = fixedEvents.some(
          (event) =>
            event.id !== _event.id &&
            event.court === _event.court &&
            ((_event.start! >= event.start! && _event.start! < event.end!) ||
              (_event.end! > event.start! && _event.end! <= event.end!))
        );

        if (isEventFixedOverlapping) {
          alert("El turno se superpone con otro turno");
          return;
        }
        
        try {
          await addDoc(collection(firestore, "turnos_fijos"), {
            day_of_week: DateTime.fromJSDate(_event.start).toFormat("E"),
            start_time: DateTime.fromJSDate(_event.start).toFormat("HH:mm"),
            end_time: DateTime.fromJSDate(_event.end).toFormat("HH:mm"),
            court: _event.court,
            owner: _event.title,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        try {
          await addDoc(collection(firestore, "turnos"), {
            court: _event.court,
            end_date: _event.end,
            owner: _event.title,
            start_date: _event.start,
            status: _event.status,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };

  const onDeleteEvent = async (id: string, deleteEventSerie?: boolean) => {
    if (!id || id === "") return;
    if (deleteEventSerie) {
      const eventSerieRef = doc(firestore, "turnos_fijos", id);
      await deleteDoc(eventSerieRef);
    } else {
      const eventDoc = await getDoc(doc(firestore, "turnos", id));
      if (eventDoc.exists()) {
        await deleteDoc(eventDoc.ref);
      } else {
        await deleteDoc(eventDoc.ref);
      }
    }
  };

  const onDatesSet = (dates: DatesSetArg) => {
    setDateRange({ start: dates.start, end: dates.end });
  };

  return (
    <CalendarView
      onLogout={signOut}
      events={getFilteredFixedEvents(events, fixedEvents)}
      onDeleteEvent={onDeleteEvent}
      onSaveEvent={onSaveEvent}
      onDatesSet={onDatesSet}
      initialDate={dateRange.start}
    />
  );
};

const getFilteredFixedEvents = (
  events: Event[],
  fixedEvents: Event[]
): Event[] => {
  fixedEvents = fixedEvents.filter(
    (fixedEvent) =>
      !events.some((event) => event.fixedEventId === fixedEvent.id)
  );

  let ordererFixedEvents = [...events, ...fixedEvents].sort((a, b) => {
    if (a.court! > b.court!) {
      return 1;
    }
    if (a.court! < b.court!) {
      return -1;
    }
    return 0;
  });

  ordererFixedEvents = ordererFixedEvents.sort((a, b) => {
    if (a.isFixedEvent! > b.isFixedEvent!) {
      return 1;
    }
    if (a.isFixedEvent! < b.isFixedEvent!) {
      return -1;
    }
    return 0;
  });

  return ordererFixedEvents;
};
