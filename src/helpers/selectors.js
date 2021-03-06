export function getAppointmentsForDay(state, day) {
  const sday = state.days.find((d) => d.name === day);
  if (sday === undefined) {
    return [];
  }
  const appointmentsForDay = sday.appointments.map((id) => {
    return state.appointments[id];
  });
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewStats = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return interviewStats;
}

export function getInterviewersForDay(state, day) {
  const sday = state.days.find((d) => d.name === day);
  if (sday === undefined) {
    return [];
  }

  if (!sday.interviewers) {
    return [];
  }

  const results = sday.interviewers.map((id) => {
    return state.interviewers[id];
  });
  return results;
}
