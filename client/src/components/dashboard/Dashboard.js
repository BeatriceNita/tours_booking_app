import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dashboard_Guide from './Dashboard_Guide';
import Dashboard_Tourist from './Dashboard_Tourist';

class Dashboard extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div id="app" >
                <br></br>
                <React.Fragment>
                    {user.role === "guide" ?
                        <React.Fragment>
                            <Dashboard_Guide></Dashboard_Guide>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Dashboard_Tourist></Dashboard_Tourist>
                        </React.Fragment>
                    }
                </React.Fragment>
                <br></br>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Dashboard);