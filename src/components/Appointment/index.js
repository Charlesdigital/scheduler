import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("test9...", props);

  //when you click on save, it creates an interview object
  function save(name, interviewer) {
    // alert(name) gets triggered on the + vs the save if you don't use () =>
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function deleteInterview() {
    transition(DELETE)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

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
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}

        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
       {mode === DELETE && (
        <Status
          message="Deleting"
        />
      )}
       {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}

export default Appointment;
//is props sending all?
// student={interview.student} interviewer={interview.interviewer}
//how to the name based off the id?
