import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function index(props) {
  const currentComponent = function (interview) {
    if (interview) {
      return <Show />;
    } else {
      return <Empty />;
    }
  };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {currentComponent(props.interview)}
    </article>
  );
}

export default index;
