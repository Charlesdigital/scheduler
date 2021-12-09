import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  console.log(props);
  const formatSpots = function (spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else if (spots === 2) {
      return "2 spots remaining";
    } else return `${spots} spots remaining`;
  };

  const buttonClass = classNames("dayClass", {
    "day-list__item": true,
    "day-list__item--selected ": props.selected === true,
    "day-list__item--full": props.spots === 0,
  });
  //   return (
  //     <li className={buttonClass} onClick={() => props.setDay(props.name)}>
  //       <h2 className="text--regular">{props.name}</h2>
  //       <h3 className="text--light">{formatSpots(props.spots)}</h3>
  //     </li>
  //   );
  return (
    <li
      className={buttonClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
