import React from "react";
import classes from './Button.module.css'

const button = props => {
    const classList = [classes.Button, classes[props.btnType]].join(' ');
    return (
        <button className={classList} onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
    );
}

export default button;