import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });
  //   let buttonClass = "button";

  //   if (props.confirm) {
  //     buttonClass += " button--confirm";
  //   }

  //   if (props.danger) {
  //     buttonClass += " button--danger";
  //   }
//   console.log(props);
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
