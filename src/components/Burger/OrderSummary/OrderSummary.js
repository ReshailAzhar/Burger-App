import React, { useEffect } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const orderSummary = props => {

    // useEffect(()=>{
    //     console.log("orderSummary render");
    // })

    const summary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
    });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {summary}
            </ul>
            <strong>Total Price: {props.price.toFixed(2)}$</strong>
            <p>Proceed to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" 
            clicked={props.purchaseContinue}
            >
                {/* <Link to='/checkout'>Continue</Link> */}
                Continue
            </Button>
        </Auxiliary>
    );
}

export default orderSummary;