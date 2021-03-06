import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState();
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    props.onCancel();
    setError("");

  };

  function validate() {
      if(student === "") {
        setError("student name cannot be blank");
        return;
      }
      if(!interviewer) {
        setError("Interviewer should be selected");
        return;
      }
      setError("");
      props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__validation">{error}</section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
//when you call a function, use an () => to delay the function being called  <Button confirm onClick={() => props.onSave(student, interviewer)}>
//without () => when you click the + button it will trigger, when you want it to be triggered on the save button