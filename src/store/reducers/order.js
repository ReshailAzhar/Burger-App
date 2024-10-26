import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    loading: false
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'setLoad':
            console.log('load')
            return{
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            }

        case actionTypes.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                loading: false
                // orders: state.orders.concat(action.order)
            }
    
        default:
            return state;
    }
}

export default reducer;