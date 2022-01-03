import { useState, useEffect} from "react";
import axios from "axios";


const useApplicationData = () => {

//1.Initial state
const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

//2. Fetch data from API and setState on inital render
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}).then((res) => {
        //only update the UI state if deleted in the api
        setState(prevState => (updateSpots(id, prevState, appointments)));
      })
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

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
        //only update the UI state if deleted in the api
        setState(prevState => (updateSpots(id, prevState, appointments, true)));
      })

    }
// 5. Updating Spots when bookInterview or cancelInterview is called
    function updateSpots(appointmentId, state, appointments, isCreate = false) {
    const days = state.days.map((day) => {

        if (state.day === day.name) {
            if(isCreate) {
                day.spots += 1
            } else if (!state.appointments[appointmentId].interview) {
              day.spots -= 1
            }
        }
        return day
    })
        return {...state, appointments, days}
    }
  return { setState, state, bookInterview, cancelInterview }
}
export default useApplicationData;

//spots comes from days: all[0].data,
