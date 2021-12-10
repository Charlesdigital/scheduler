import React from "react";
import "components/Appointment/styles.scss";

function index(props) {
  return (
    <article className="appointment">Appointment at {props.time} </article>
  );
}

export default index;
