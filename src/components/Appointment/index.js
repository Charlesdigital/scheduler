import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("test9", mode);

  //   console.log("test2", props.interviewer);
  //if there's an interview key return show
  //   const checkInterview = function (interview) {
  //     if (interview) {
  //       return (
  //         <Show
  //           student={interview.student}
  //           interviewer={interview.interviewer.name}
  //         />
  //       );
  //     } else {
  //       return <Empty />;
  //     }
  //   };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {checkInterview(props.interview)} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    </article>
  );
}

export default Appointment;
//is props sending all?
// student={interview.student} interviewer={interview.interviewer}
//how to the name based off the id?
