import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalContentContainer, StyledContainer } from "./CalendarView.styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";
import { Dialog, Form } from "./UI";

export const CalendarView = () => {
  const [events, setEvents] = useState<EventSourceInput>([
    { title: "Meeting", start: new Date() },
    {
      title: "Meeting",
      start: new Date("2023-08-15T23:30:00"),
      end: new Date("2023-08-15T23:59:00"),
      id: "1",
      editable: true,
    },
  ]);

  const [ShowModal, setShowModal] = useState<boolean>(true);
  const [SelectedDate, setSelectedDate] = useState<Date | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const handleClickEvent = (arg: EventClickArg) => {
    console.log(arg, "click event", arg.event.toJSON());
  };

  return (
    <StyledContainer>
      <Dialog
        show={ShowModal}
        onClose={() => setShowModal(false)}
        contentProps={{ style: { width: "90%", maxWidth: "60rem" } }}
      >
        <ModalContentContainer>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submit", e);
            }}
          />
        </ModalContentContainer>
      </Dialog>
      <div className="HEADER">
        <h1 className="HEADER__Title">HD Padel - IVAN</h1>
        <button
          className="HEADER__Button"
          onClick={() => console.log("cerrar sesion")}
        >
          Cerrar sesión
        </button>
      </div>

      <FullCalendar
        themeSystem="bootstrap5"
        allDaySlot={false}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Hoy",
          week: "Semana",
          day: "Día",
          month: "Mes",
          list: "Lista",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        weekends={true}
        events={events}
        eventContent={renderEventContent} // custom render function
        eventClick={handleClickEvent}
        // eventsSet={(e) => handleDateClick(e, "eventsSet")}
        locale="es"
        // views={{
        //   timeGridWeek: {},
        //   timeGridDay: {},
        // }}
        dateClick={handleDateClick}
      />
    </StyledContainer>
  );
};

function renderEventContent(eventInfo: EventContentArg) {
  // console.log("eventInfo", eventInfo);
  return (
    <div className="eventContent">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
