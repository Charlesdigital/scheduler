import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function Appointment(props) {
  console.log("test2", props.interviewer);
  //if there's an interview key return show
  const checkInterview = function (interview) {
    if (interview) {
      return (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      );
    } else {
      return <Empty />;
    }
  };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {checkInterview(props.interview)}
    </article>
  );
}

export default Appointment;
//is props sending all?
// student={interview.student} interviewer={interview.interviewer}
//how to the name based off the id?
