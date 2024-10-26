import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import IngredientContext from "../../context/IngredientContext";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // ingredients: null,
        // price: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount(){
    //     console.log(this.props.ingredients[this.props.ingredients.meat]);
    // }

    componentDidMount() {
        // console.log(this.props);
        this.props.onSetIngredients();
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        // console.log(sum);

        // Alternative of above
        // let sumig = 0;
        // const sum = Object.keys(ingredients).map(igKey => {
        //     return ingredients[igKey];
        // }).forEach(key => {
        //     sumig = sumig + key;
        // })
        // console.log(sumig);


        // this.setState({
        //     purchasable: sum > 0
        // });

        return sum > 0
    }

    purchaseHandler = () => {
        // document.querySelector('#Modal').classList.add('show-modal');
        this.setState({ purchasing: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // console.log(disabledInfo);

        let orderSummary;

        let burger = this.state.error ? <p>Ingredients failed to load!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = <Auxiliary>
                <Burger ingredients={this.props.ingredients} />
                <IngredientContext.Provider value={{
                    addIng: this.props.onAddIngredient,
                    removeIng: this.props.onRemoveIngredient,
                    ingredients: this.props.ingredients
                }}>
                    <BuildControls
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler} />
                </IngredientContext.Provider>
            </Auxiliary>

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinue={this.purchaseContinueHandler} />

        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        //     console.log('spin');
        // }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: igName => dispatch(burgerBuilderActions.addIngredient(igName)),
        onRemoveIngredient: igName => dispatch(burgerBuilderActions.removeIngredient(igName)),
        onSetIngredients: ()=>dispatch(burgerBuilderActions.setIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default BurgerBuilder;