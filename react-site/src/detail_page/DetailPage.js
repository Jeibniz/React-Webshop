import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import routes from "constants/routes";
import "./DetailPage.css"

const mapStateToProps = state => ({
    ...state
});


/**
 * Contains the page where a specific item is displayed and added to the cart.
 */
class DetailPage extends Component {

    constructor(props) {
        super(props);
        let item;
        if(undefined === this.props.currentItemReducer.current_item){
            console.log("DetailPage: undefined item, routing back to HOME");
            item = {};
            this.routeBack();
        } else {
            item = this.props.currentItemReducer.current_item
        }

        this.state = {
            item: item
        };
    }

    routeBack = () => {
        this.props.history.push(routes.HOME);
    };

    render() {
        if(null === this.state.item){
            console.log("Detail page: item is null");
            return (
                <div className ="DetailPage-Container">
                    <h1> {"Routing back, item is undefined"} </h1>
                </div>
            );
        }

        return (
            <div className ="DetailPage-Container">
                <h1> {this.state.item.name} </h1>
                <pre>
                    {
                        JSON.stringify(this.props)
                    }
                </pre>
            </div>
        );
    }
}

export default connect(mapStateToProps)  (withRouter(DetailPage));