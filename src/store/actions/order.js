import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";



const purchaseBurgerSuccess=(id,order)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: order
    }
}

const purchaseBurgerFailed=()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    }
}

export const purchaseBurger=(order,history)=>{
    return dispatch=>{
        dispatch({type: 'setLoad'})
        axios.post('/orders.json', order)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,order));
                history.push("/");
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed);
            })
    }
}