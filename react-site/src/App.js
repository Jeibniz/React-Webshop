import React, { Component } from 'react';
import  {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import ShopPage from "./shop_page/ShopPage";
import DetailPage from "./detail_page/DetailPage";
import routes from "constants/routes";


/**
 * The entry point of the app.
 */
class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="App">
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