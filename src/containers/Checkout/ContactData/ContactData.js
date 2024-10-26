import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import  * as actions from '../../../store/actions/index';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'cheapest', displayValue: 'Cheapest' },
                        { value: 'fastest', displayValue: 'Fastest' }
                    ]
                },
                value: 'cheapest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderHandler = event => {
        console.log(this.props);
        event.preventDefault();

        // this.setState({ loading: true });

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: formData
        }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //         })
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //         })
        //         console.log(error);
        //     })
        this.props.onOrder(order,this.props.history);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...this.state.orderForm[inputIdentifier] }

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        console.log(updatedElement);

        updatedOrderForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;

        // if(!rules)  // for deliveryMethod property, which doesn't have validation object
        // {
        //     return true;
        // }

        if (rules) {
            if (rules.required && isValid) {
                isValid = value.trim() !== '';
            }

            if (rules.minLength && isValid) {
                isValid = value.length >= rules.minLength;
            }

            if (rules.maxLength && isValid) {
                isValid = value.length <= rules.maxLength;
            }
        }

        return isValid;
    }

    render() {

        // let form = (
        //     <form onSubmit={this.orderHandler}>
        //         <Input elementType='...' elementConfig='...' value='...' />
        //         <Input inputType='input' type="email" name="email" placeholder="Your Email" />
        //         <Input inputType='input' type="text" name="street" placeholder="Street" />
        //         <Input inputType='input' type="text" name="postal" placeholder="Postal Code" />
        //         <Button btnType='Success'>ORDER</Button>
        //     </form>
        // );

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        console.log(formElementsArray);

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => {
                    return <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                })}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (order,history)=>dispatch(actions.purchaseBurger(order, history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));