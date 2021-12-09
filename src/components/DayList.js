import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const days = props.days;

  return (
    <ul>
      {days.map((day) => {
        return (
          <DayListItem
            name={day.name}
            spots={day.spots}
            setDay={props.setDay}
            selected={props.day === day.name}
          />
        );
      })}
    </ul>
  );
}

export default DayList;
