import {
  DatesSetArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalContentContainer, StyledContainer } from "./CalendarView.styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useContext, useRef, useState } from "react";
import { Checkbox, Dialog, InputPresets } from "../UI";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { SingleSelect } from "../UI/Select";
import { useForm } from "../../hooks/useForm";
import { Event } from "../../types/app.types";
import { useResponsiveMap } from "../../hooks/useResponsiveManager";
import { DateTime } from "luxon";
import { AuthContext } from "../../context/AuthContext";

interface CalendarViewProps {
  onLogout?: () => void;
  events?: Event[];
  onDeleteEvent?: (id: string, deleteEventSerie?: boolean) => void;
  onSaveEvent?: (event: Event) => Promise<void>;
  onDatesSet?: (dateInfo: DatesSetArg) => void;
  fixedEvents?: Event[];
  initialDate?: Date | null;
}

export const CalendarView = ({
  events,
  onDeleteEvent,
  onSaveEvent,
  onLogout,
  onDatesSet,
  initialDate,
}: CalendarViewProps) => {
  const { isDesktop, isPhone } = useResponsiveMap();
  const { user } = useContext(AuthContext);

  const calendarRef = useRef<FullCalendar>(null);

  const { form, onChange, reset, setFormValue } = useForm({
    id: "",
    owner: "",
    court: "",
    isFixedEvent: false,
    isConfirmed: false,
    fixedEventId: "",
  });

  const formErrorsInitialState = {
    owner: false,
    court: false,
    startDate: false,
    endDate: false,
  };

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>(
    formErrorsInitialState
  );

  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: DateClickArg) => {
    const endDate = new Date(arg.date);
    endDate.setMinutes(endDate.getMinutes() + 60);
    setDateRange({ start: arg.date, end: endDate });
    setShowModal(true);
    setIsCreatingEvent(true);
  };

  const handleClickEvent = (arg: EventClickArg) => {
    setFormValue({
      id: arg.event.id,
      owner: arg.event.title,
      court: arg.event.extendedProps.court,
      isFixedEvent: arg.event.extendedProps.isFixedEvent,
      isConfirmed: arg.event.extendedProps.status === "confirmed",
      fixedEventId: arg.event.extendedProps.fixedEventId,
    });
    setDateRange({ start: arg.event.start, end: arg.event.end });
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

  const handleDeleteEvent = (deleteSerie?: boolean) => {
    onDeleteEvent?.(form.id, deleteSerie);
    reset();
    setDateRange({ start: null, end: null });
    setShowModal(false);
    setIsEditingEvent(false);
    setIsCreatingEvent(false);
  };

  const handleCloseEvent = () => {
    reset();
    setDateRange({ start: null, end: null });
    setShowModal(false);
    setIsEditingEvent(false);
    setIsCreatingEvent(false);
  };

  const onCreateOtherEvent = () => {
    reset();
    setIsCreatingEvent(true);
    setIsEditingEvent(false);
  };

  const handleSaveEvent = async () => {
    if (
      form?.court === "" ||
      form?.owner === "" ||
      !dateRange.start ||
      !dateRange.end
    ) {
      setFormErrors({
        court: form?.court === "",
        owner: form?.owner === "",
        startDate: !dateRange.start,
        endDate: !dateRange.end,
      });
      return;
    }

    if (
      DateTime.fromJSDate(dateRange.end) <=
        DateTime.fromJSDate(dateRange.start) ||
      (DateTime.fromJSDate(dateRange.end).hasSame(
        DateTime.fromJSDate(dateRange.start),
        "hour"
      ) &&
        DateTime.fromJSDate(dateRange.end).hasSame(
          DateTime.fromJSDate(dateRange.start),
          "minute"
        ))
    ) {
      setFormErrors({
        startDate: true,
        endDate: true,
      });
      return;
    }

    await onSaveEvent?.({
      id: isEditingEvent ? form.id : undefined,
      title: form.owner,
      start: dateRange.start,
      end: dateRange.end,
      court: form.court,
      status: form.isConfirmed ? "confirmed" : "pending",
      isFixedEvent: form.isFixedEvent,
      fixedEventId: form.fixedEventId,
    });

    setFormErrors(formErrorsInitialState);
    reset();
    setDateRange({ start: null, end: null });
    setShowModal(false);
    setIsEditingEvent(false);
    setIsCreatingEvent(false);
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
            {isEditingEvent ? "Editar" : "Crear"} Turno{" "}
            {form.isFixedEvent || form.fixedEventId ? "Fijo" : ""}
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
            selected={dateRange.start}
            onChange={(date) => setDateRange({ ...dateRange, start: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            showPopperArrow={false}
            placeholderText="Hora de inicio"
            popperClassName="MODAL__DatePicker-Popper"
            calendarClassName="MODAL__DatePicker"
            isClearable={!form.fixedEventId}
            disabled={!!form.fixedEventId}
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
            selected={dateRange.end}
            onChange={(date) => setDateRange({ ...dateRange, end: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            showPopperArrow={false}
            placeholderText="Hora final"
            popperClassName="MODAL__DatePicker-Popper"
            calendarClassName="MODAL__DatePicker"
            isClearable={!form.fixedEventId}
            disabled={!!form.fixedEventId}
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
            {!isCreatingEvent && (
              <Checkbox
                label={
                  !form.isFixedEvent ? "Esta confirmado" : "Confirmar turno"
                }
                onChange={(event) =>
                  onChange(event.target.checked, "isConfirmed")
                }
                checked={form.isConfirmed}
              />
            )}
            {(isCreatingEvent || form.fixedEventId) && (
              <Checkbox
                label="Es turno fijo"
                disabled={!!form.fixedEventId}
                onChange={(event) =>
                  onChange(event.target.checked, "isFixedEvent")
                }
                checked={form.isFixedEvent || !!form.fixedEventId}
              />
            )}
          </div>
          <div className="MODAL__Buttons">
            {isEditingEvent && (
              <button
                className="MODAL__Button MODAL__Button--Delete"
                onClick={() => handleDeleteEvent(form.isFixedEvent)}
              >
                {form.isFixedEvent ? "Borrar Serie" : "Borrar"}
              </button>
            )}
            {isEditingEvent && (
              <button
                className="MODAL__Button"
                onClick={() => onCreateOtherEvent()}
              >
                Crear Otro
              </button>
            )}
            <button className="MODAL__Button" onClick={handleSaveEvent}>
              Guardar
            </button>
          </div>
        </ModalContentContainer>
      </Dialog>
      <div className="HEADER">
        <h1 className="HEADER__Title">
          HD Padel - {user?.username?.toUpperCase() ?? ""}
        </h1>
        <button className="HEADER__Button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>

      <FullCalendar
        ref={calendarRef}
        initialDate={initialDate ?? undefined}
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
        datesSet={onDatesSet}
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
