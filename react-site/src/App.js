import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction'
import './App.css';
import ShopPage from "./shop_page/ShopPage";

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

const mapStateToProps = state => ({
    ...state
});


class App extends Component {
    /**
     * @summary handles button click
     */
    simpleAction = (event) => {
        this.props.simpleAction();
    };

    render() {
        return (
            <div>
              <ShopPage/>
              <pre>
              {
                  JSON.stringify(this.props)
              }
              </pre>
              <button onClick={this.simpleAction}>Test redux action</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);