import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css'

const burger = props => {

    let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    // console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    // const arr=transformedIngredients.map(igKey=>{
    //     return [...Array(props.ingredients[igKey])].map((_,i)=>{
    //         return <BurgerIngredient type={igKey} key={igKey+1}/>
    //     })
    // })
    // console.log(arr);
    // console.log(arr.forEach(a=>{
    //     console.log(a);
    // }));
    // console.log(props.ingredients[transformedIngredients[1]]);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;