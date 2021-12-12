import DayList from "components/DayList";
import React, { useState, useEffect } from "react";
import axios from "axios";
// don't have to have index at the end as it is the default, always point to a file not a folder
import Appointment from "components/Appointment/";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

// "GET_DAYS":     http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

// const initialAppointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];

// const initialDaysValue = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState(initialDaysValue);
  // const [appointments, setAppointments] = useState(initialAppointments);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  // useEffect(() => {
  //   axios.get("/api/days").then((response) => {
  //     setState({ ...state, days: response.data });
  //     // console.log("test3", response.data);
  //   });
  // }, []);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log("test4", all[0].data); // first
      console.log("test5", all[1].data); // second
      console.log("test6", all[2].data); // third

      // const [days, appointments, interviewers] = all;
      setState((prevState) => ({
        ...prevState,
        days: all[0].data,
        appointments: all[1].data,
        // appointments: initialAppointments,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const currentDayAppointments = getAppointmentsForDay(state, state.day);

  const eachAppointment = currentDayAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
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
            // days={days}
            // day={"Monday"}
            // setDay={(day) => console.log(day)}
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
      <section className="schedule">{eachAppointment}</section>
    </main>
  );
}
