import { useState, useEffect} from "react";
import axios from "axios";


const useApplicationData = () => {

//1.Initial state
const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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
    //   console.log("test4", all[0].data); // first
      console.log("test5", all[1].data); // second
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
    // console.log(id, interview);
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
        setState(prevState => (updateSpots(prevState, appointments)));
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
        setState(prevState => (updateSpots(prevState, appointments, true)));
        console.log("test15",state.days)
      })

    }
// 5. Updating Spots when bookInterview or cancelInterview is called
    function updateSpots(state, appointments, isCreate = false) {
    const days = state.days.map((day) => {

        if (state.day === day.name) {
            if(isCreate) {
                day.spots += 1
            } else day.spots -= 1
        }
        return day
    })
        return {...state, appointments, days}
    }
  return { setState, state, bookInterview, cancelInterview }
}
export default useApplicationData;

//...state

//spots comes from days: all[0].data,
