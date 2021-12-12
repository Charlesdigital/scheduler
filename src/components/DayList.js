import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const { days, currentDay, setDay } = props;
  //   const days = props.days;

  return (
    <ul>
      {days.map((day) => {
        return (
          <DayListItem
            //in react you need a key to reference each component whenever iterate in an array, because of virtual DOM, its referring to that key and changing it
            key={day.id}
            name={day.name}
            spots={day.spots}
            setDay={setDay}
            selected={currentDay === day.name}
          />
        );
      })}
    </ul>
  );
}

export default DayList;
