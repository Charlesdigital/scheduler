import React from "react";
import useApplicationData from "../hooks/useApplicationData";
import DayList from "components/DayList";
import Appointment from "components/Appointment/";
import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const {
    setState,
    state,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const currentDayAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const eachAppointment = currentDayAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        //can pass in functions
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* DayListItem is a child of DayList */}
          <DayList
            days={state.days}
            currentDay={state.day}
            setDay={(day) => setState({ ...state, day })}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {eachAppointment}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}

