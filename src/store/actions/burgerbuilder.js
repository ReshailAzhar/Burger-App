import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";


export const addIngredient = igName => {
    return { type: actionTypes.ADD_INGREDIENT, igType: igName }
}

export const removeIngredient = igName => {
    return { type: actionTypes.REMOVE_INGREDIENT, igType: igName }
}

const loadIngredients= ingredients =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const errorIngredients= () =>{
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED,
    }
}

export const setIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-88619-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(loadIngredients(response.data))
            })
            .catch(error => {
                dispatch(errorIngredients())
            })

    }
}