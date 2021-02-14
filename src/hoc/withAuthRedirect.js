import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom"

let mapStateToPropsForRedirect = (state) => ({
    client: state.client
})

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if(this.props.client === '') return <Redirect to='login' />

            return <Component {...this.props} />
        }
    }
    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectAuthRedirectComponent;
}