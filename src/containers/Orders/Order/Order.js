import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push({ name: key, amount: props.ingredients[key] });
    }
    console.log(ingredients);

    const ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{ display: 'inline-block', margin: '0 8px', padding: '5px', border: '1px solid #ccc', textTransform: 'capitalize' }}>
            {ig.name} ({ig.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;
