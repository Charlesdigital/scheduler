import { useState, useEffect} from "react";
import axios from "axios";


const useApplicationData = () => {

//1.
const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

//Fetch data from API and setState on inital render
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
    //   console.log("test4", all[0].data); // first
    //   console.log("test5", all[1].data); // second
    //   console.log("test6", all[2].data); // third

      // const [days, appointments, interviewers] = all;
      //fetch data from the api and then store in setState
      setState((prevState) => ({
        ...prevState,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

//3.
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, {interview})
  }


//4.
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  return { setState, state, bookInterview, cancelInterview }
}
export default useApplicationData;

//...state