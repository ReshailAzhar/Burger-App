import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 1.4,
    cheese: 0.4,
    bacon: 0.7
}


const initialState = {
    ingredients: null,
    price: 4
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            const addUpdatedIngredients = { ...state.ingredients };
            addUpdatedIngredients[action.igType] = ++addUpdatedIngredients[action.igType];
            const addUpdatedPrice = state.price + INGREDIENTS_PRICE[action.igType];

            return {
                ingredients: addUpdatedIngredients,
                price: addUpdatedPrice
            }

        case actionTypes.REMOVE_INGREDIENT:
            const removeUpdatedIngredients = { ...state.ingredients };
            removeUpdatedIngredients[action.igType] = --removeUpdatedIngredients[action.igType];
            const removeUpdatedPrice = state.price - INGREDIENTS_PRICE[action.igType];

            return {
                ingredients: removeUpdatedIngredients,
                price: removeUpdatedPrice
            }

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients
            }

        default:
            return state;
    }
}

export default reducer