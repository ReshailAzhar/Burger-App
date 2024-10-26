import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {

        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ id: key, ...res.data[key] })
                }
                console.log(fetchedOrders);

                this.setState({ orders: fetchedOrders, loading: false })
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let data = this.state.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        });

        if (this.state.loading) {
            data = <Spinner />
        }

        return (
            <div>
                {data}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);