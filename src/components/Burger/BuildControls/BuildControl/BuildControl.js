import React, { useContext } from "react";
import classes from './BuildControl.module.css'
import IngredientContext from "../../../../context/IngredientContext";

const BuildControl = props => {

    const igContext = useContext(IngredientContext);

    return (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button className={classes.Less} onClick={() => igContext.removeIng(props.type)} disabled={props.disabled[props.type]}>Less</button>
            <h3 className={classes.Quantity}>{igContext.ingredients[props.type]}</h3>
            <button className={classes.More} onClick={() => igContext.addIng(props.type)}>More</button>
        </div>
    )
};

export default BuildControl;