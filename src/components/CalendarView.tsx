import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalContentContainer, StyledContainer } from "./CalendarView.styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import { Checkbox, Dialog, InputPresets } from "./UI";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { SingleSelect } from "./UI/Select";
import { useForm } from "../hooks/useForm";
import { Event } from "../types/app.types";
import { useResponsiveMap } from "../hooks/useResponsiveManager";

export const CalendarView = () => {
  const { isDesktop, isPhone } = useResponsiveMap();
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "ivan",
      start: new Date("2023-08-17T13:30:00"),
      end: new Date("2023-08-17T14:00:00"),
      court: "1",
      status: "confirmed",
      isFixedEvent: false,
    },
  ]);

  const calendarRef = useRef<FullCalendar>(null);

  const { form, onChange, reset, setFormValue } = useForm({
    id: "",
    owner: "",
    court: "",
    isFixedEvent: false,
    isConfirmed: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    owner: false,
    court: false,
    startDate: false,
    endDate: false,
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [EndDate, setEndDate] = useState<Date | null>(null);

  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: DateClickArg) => {
    setStartDate(arg.date);
    const endDate = new Date(arg.date);
    endDate.setMinutes(endDate.getMinutes() + 60);
    setEndDate(endDate);
    setShowModal(true);
  };

  const handleClickEvent = (arg: EventClickArg) => {
    setFormValue({
      id: arg.event.id,
      owner: arg.event.title,
      court: arg.event.extendedProps.court,
      isFixedEvent: arg.event.extendedProps.isFixedEvent,
      isConfirmed: arg.event.extendedProps.status === "confirmed",
    });
    setStartDate(arg.event.start);
    setEndDate(arg.event.end);
    setIsEditingEvent(true);
    setShowModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGotoDayDate = (event: any) => {
    if (event.date) {
      calendarRef.current?.getApi().gotoDate(event.date);
      calendarRef.current?.getApi().changeView("timeGridDay");
    } else {
      calendarRef.current?.getApi().gotoDate(event.event.start ?? new Date());
      calendarRef.current?.getApi().changeView("timeGridDay");
    }
  };

  const handleDeleteEvent = () => {
    console.log(form);
    setEvents((prev) => prev.filter((event) => event.id !== form.id));
    reset();
    setStartDate(null);
    setEndDate(null);
    setShowModal(false);
    setIsEditingEvent(false);
  };

  const handleCloseEvent = () => {
    reset();
    setStartDate(null);
    setEndDate(null);
    setShowModal(false);
    setIsEditingEvent(false);
  };

  const handleSaveEvent = () => {
    console.log("save", form, startDate, EndDate);
    if (form?.court === "" || form?.owner === "" || !startDate || !EndDate) {
      setFormErrors({
        court: form?.court === "",
        owner: form?.owner === "",
        startDate: !startDate,
        endDate: !EndDate,
      });
      return;
    }
    if (isEditingEvent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setEvents((prev) =>
        prev.map((event) =>
          event.id === form.id
            ? {
                id: form.id,
                title: form.owner,
                start: startDate,
                end: EndDate,
                court: form.court,
                status: form.isConfirmed ? "confirmed" : "pending",
                isFixedEvent: form.isFixedEvent,
              }
            : event
        )
      );
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          title: form.owner,
          start: startDate,
          end: EndDate,
          court: form.court,
          status: form.isConfirmed ? "confirmed" : "pending",
          isFixedEvent: form.isFixedEvent,
        },
      ]);
    }

    reset();
    setStartDate(null);
    setEndDate(null);
    setShowModal(false);
    setIsEditingEvent(false);
  };

  return (
    <StyledContainer isDesktop={isDesktop}>
      <Dialog
        show={ShowModal}
        onClose={handleCloseEvent}
        contentProps={{ style: { width: "90%", maxWidth: "60rem" } }}
      >
        <ModalContentContainer>
          <h2 className="MODAL__Title">
            {isEditingEvent ? "Editar" : "Crear"} Turno
          </h2>
          <SingleSelect
            className="MODAL__Input-Select"
            options={[
              { value: "1", label: "Cancha 1" },
              { value: "2", label: "Cancha 2" },
              { value: "3", label: "Cancha 3" },
            ]}
            selectProps={{
              className: formErrors["court"] ? "MODAL__Input-Error" : "",
            }}
            value={form.court}
            placeholder="Elige cancha"
            onChangeValue={(value) => onChange(value, "court")}
          />
          <InputPresets.TextInput
            className="MODAL__Input-Text"
            placeholder="Titular"
            containerProps={{
              className: `MODAL__Input ${
                formErrors["owner"] ? "MODAL__Input-Error" : ""
              }`,
            }}
            onChange={(event) => onChange(event.target.value, "owner")}
            value={form.owner}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            isClearable
            showPopperArrow={false}
            placeholderText="Hora de inicio"
            popperClassName="MODAL__DatePicker-Popper"
            calendarClassName="MODAL__DatePicker"
            customInput={
              <InputPresets.TextInput
                containerProps={{
                  className: `MODAL__Input ${
                    formErrors["startDate"] ? "MODAL__Input-Error" : ""
                  }`,
                }}
                className="MODAL__Input MODAL__Input-Time"
              />
            }
          />
          <DatePicker
            selected={EndDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            isClearable
            showPopperArrow={false}
            placeholderText="Hora final"
            popperClassName="MODAL__DatePicker-Popper"
            calendarClassName="MODAL__DatePicker"
            customInput={
              <InputPresets.TextInput
                containerProps={{
                  className: `MODAL__Input ${
                    formErrors["endDate"] ? "MODAL__Input-Error" : ""
                  }`,
                }}
                className="MODAL__Input-Time"
              />
            }
          />
          <div className="MODAL__Checkboxes">
            <Checkbox
              label="Esta confirmado"
              onChange={(event) =>
                onChange(event.target.checked, "isConfirmed")
              }
              checked={form.isConfirmed}
            />
            <Checkbox
              label="Es turno fijo"
              onChange={(event) =>
                onChange(event.target.checked, "isFixedEvent")
              }
              checked={form.isFixedEvent}
            />
          </div>
          <div className="MODAL__Buttons">
            {form.isFixedEvent && (
              <button
                className="MODAL__Button MODAL__Button--Delete"
                onClick={handleDeleteEvent}
              >
                Borrar Serie
              </button>
            )}
            {isEditingEvent && (
              <button
                className="MODAL__Button MODAL__Button--Delete"
                onClick={handleDeleteEvent}
              >
                Borrar
              </button>
            )}
            <button className="MODAL__Button" onClick={handleSaveEvent}>
              Guardar
            </button>
          </div>
        </ModalContentContainer>
      </Dialog>
      <div className="HEADER">
        <h1 className="HEADER__Title">HD Padel - IVAN</h1>
        <button
          className="HEADER__Button"
          onClick={() => console.log("cerrarseions")}
        >
          Cerrar sesión
        </button>
      </div>

      <FullCalendar
        ref={calendarRef}
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
        weekends={true}
        events={events}
        eventContent={(event) => renderEventContent(event, isPhone)} // custom render function
        eventClick={handleClickEvent}
        dateClick={handleDateClick}
        locale="es"
        views={{
          timeGridWeek: {
            dateClick: handleGotoDayDate,
            eventClick: handleGotoDayDate,
          },
          timeGridDay: {},
        }}
      />
    </StyledContainer>
  );
};

const getStatusColor = (event: Event) => {
  if (event.status === "confirmed") {
    return "green";
  }

  if (event.isFixedEvent) {
    return "orange";
  }

  return "gray";
};

function renderEventContent(eventInfo: EventContentArg, isPhone: boolean) {
  return (
    <div
      className="eventContent"
      style={{
        backgroundColor: getStatusColor(eventInfo.event.extendedProps as Event),
      }}
    >
      <b style={{ whiteSpace: !isPhone ? "nowrap" : "normal" }}>
        {eventInfo.timeText}
      </b>
      <i style={{ whiteSpace: "nowrap" }}>
        C: {eventInfo.event.extendedProps.court}
      </i>
      <p style={{ whiteSpace: "nowrap" }}>
        {eventInfo.event.title.toUpperCase()}
      </p>
    </div>
  );
}
