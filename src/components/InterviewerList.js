import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        // interviewerId={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        // setInterviewer={() => props.onChange(interviewer.id)}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};
export default InterviewerList;

// .add("Clickable", () => (
//     <InterviewerList
//       interviewers={interviewers}
//       setInterviewer={action("setInterviewer")}
//     />
//   ));

//passing down the key interviewers and setInterviewer to the children, where they get access to the value
