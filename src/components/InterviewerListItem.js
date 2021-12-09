import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem(props) {
  console.log("test1", props);
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
