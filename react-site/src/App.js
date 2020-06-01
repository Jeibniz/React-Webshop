import React, { Component } from 'react';
import  {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CartAppBar from 'components/CartAppBar'
import TestBar from 'components/TestBar'

import './App.css';
import ShopPage from "./shop_page/ShopPage";
import DetailPage from "./detail_page/DetailPage";
import routes from "constants/routes";


/**
 * The entry point of the app.
 */
class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <CartAppBar />
                    <Switch>
                        <Route path = {routes.DETAIL} exact>
                            <DetailPage />
                        </Route>

                        <Route path = {routes.CHECKOUT} exact>
                            <h1>Checkout</h1>
                        </Route>

                        <Route path = {routes.HOME}>
                            <ShopPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;