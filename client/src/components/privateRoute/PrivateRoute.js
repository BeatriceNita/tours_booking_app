import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    //we didn’t supply a path prop so the Route will always match => the render prop will always be called
    <Route {...rest} render={(props) =>
        auth.isAuthenticated === true ?
            (<Component {...props} />) :
            (<Redirect to="/login" />)
    }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(PrivateRoute);