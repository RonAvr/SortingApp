import React from "react";
import classes from "./Bar.module.css";

function Bar(props) {
  const currentClass = props.data.status
  const cssClasses = `${classes.div} ${currentClass === 'inserted'?classes.inserted:""} ${currentClass === 'min'?classes.min:""} ${currentClass === 'progress'?classes.progress:""} ${currentClass === 'finished'?classes.finished:"" }`
  const cssToolTip = classes.tooltiptext
  return <div className={cssClasses} style={{ height: props.data.height + "px" }} >
            <span className={cssToolTip}>{props.data.height.toFixed(2)}</span>
  </div>;
}

export default Bar;
