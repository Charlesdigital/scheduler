import React from "react";
import useApplicationData from "../hooks/useApplicationData";
import DayList from "components/DayList";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
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
    // setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const currentDayAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const eachAppointment = currentDayAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("test10", interviewers);
    console.log("test13", interview);

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
      <section className="schedule">
        {eachAppointment}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}

// No need to put index at the end as it is the default, always point to a file not a folder

//you want data to be at the top level and then pass it down to the child components, a child cannot modify the data, the child can call the function but should not modify the data directly. You put the function at the top level so any changes at the child component gets reflected at the parent level

// const [day, setDay] = useState("Monday");
// const [days, setDays] = useState(initialDaysValue);
// const [appointments, setAppointments] = useState(initialAppointments);

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

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     // you may put the line below, but will have to remove/comment hardcoded appointments variable
//     appointments: {},
//     interviewers: {},
//   });

// //2.
//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ]).then((all) => {
//     //   console.log("test4", all[0].data); // first
//     //   console.log("test5", all[1].data); // second
//     //   console.log("test6", all[2].data); // third

//       // const [days, appointments, interviewers] = all;
//       //fetch data from the api and then store in setState
//       setState((prevState) => ({
//         ...prevState,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data,
//       }));
//     });
//   }, []);
// //   const setDay = day => setState(prev => ({ ...prev, day }));

// //3.
//   function bookInterview(id, interview) {
//     console.log(id, interview);
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     setState({
//       ...state,
//       appointments
//     });

//     return axios.put(`/api/appointments/${id}`, {interview})
//   }

// //4.
//   function cancelInterview(id) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     setState({
//       ...state,
//       appointments
//     });

//     return axios.delete(`/api/appointments/${id}`)
//     .then((res) => {
//       setState({ ...state, appointments });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }
