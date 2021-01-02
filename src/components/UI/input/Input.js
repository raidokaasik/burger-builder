import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputEl = null;
  const inputClasses = [classes.inputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((item, index) => (
            <option key={item + index} value={item.value}>
              {item.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.entry}>
      {props.touched &&
        (props.invalid ? (
          <div className={classes.incorrect}>x</div>
        ) : (
          <div className={classes.correct}>y</div>
        ))}

      {inputEl}
    </div>
  );
};

export default input;
