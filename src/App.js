import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Auxiliary from "./hoc/Auxiliary/Auxiliary";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route,Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  // state=<BurgerBuilder/>

  render() {

    return (
      <Auxiliary>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Auxiliary>
    );
  }
}

export default App;
