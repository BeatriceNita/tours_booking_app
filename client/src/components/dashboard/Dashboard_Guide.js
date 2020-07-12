import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

//functional React component => lack of state and lifecycle methods
const Tour = props => (
    <tr>
        <td>{props.tour.city}</td>
        <td>{props.tour.location_name}</td>
        <td>{props.tour.date}</td>
        <td>{props.tour.time}</td>
        <td>{props.tour.guide.username}</td>
        <td>{props.tour.services}</td>
        <td>{props.tour.max_capacity}</td>
        <td>{props.tour.occupied_spots}</td>
        <td>{props.tour.price_adult}</td>
        <td>{props.tour.price_child}</td>
        <td>
            <Link to={"/editTour/" + props.tour._id}>edit</Link>|
            <a href="#" onClick={() => { props.deleteTour(props.tour._id) }}>delete</a>
        </td>
    </tr>
)

class Dashboard_Guide extends Component {
    constructor(props) {
        super(props);

        this.deleteTour = this.deleteTour.bind(this);

        this.state = {
            tours: []
        }
    }

    componentDidMount() {
        axios.get('/tours/')
            .then(response => {
                this.setState({ tours: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteTour(id) {
        axios.delete('/tours/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            tours: this.state.tours.filter(el => el._id !== id)
        })
    }

    tourList() {
        return this.state.tours.map(currentTour => {
            return <Tour tour={currentTour} deleteTour={this.deleteTour} key={currentTour._id} />;
        })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged in
                            </p>
                        </h4>

                        <h3>Tours List</h3>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>City</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guide</th>
                                    <th>Services</th>
                                    <th>Max capacity</th>
                                    <th>Occupied spots</th>
                                    <th>Price for adult</th>
                                    <th>Price for child</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tourList()}
                            </tbody>
                        </table>

                        <p className="grey-text text-darken-1">
                            Wanna create a new tour? <Link to="/createTour" class="btn-floating btn-small waves-effect waves-light"><i class="material-icons">add</i></Link>
                        </p>

                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large w3-button w3-hover-teal"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard_Guide.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard_Guide);