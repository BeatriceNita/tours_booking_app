import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard_Tourist.css';

//functional React component => lack of state and lifecycle methods
const Tour = (props) => (
    <div>
        <h4>Tour city: {props.tour.city}</h4>
        <h5>Tour location: {props.tour.location_name}</h5>
        <h5>Tour date: {props.tour.date.toString().substr(0, 10)}</h5>
        <h5>Tour time: {props.tour.time}</h5>
        <h5>Tour guide: {props.tour.guide.username}</h5>
        <p>Tour services: {props.tour.services} </p>
        <p>Price for adults: {props.tour.price_adult} {props.tour.city === "London" ? "GBP" : "EUR"}</p>
        <p>Price for children: {props.tour.price_child} {props.tour.city === "London" ? "GBP" : "EUR"}</p>
        <p>Reviews: </p>
        <ul className='ul-style'>
            {
                props.tour.reviews.map(review => (
                    <li key={review._id} className='li-small-border'>
                        <p>{review.author.username} said: </p>
                        {review.text}
                    </li>
                ))
            }
        </ul>
        <br/>
        <p>Ratings: </p>
        <ul className='ul-style'>
            {
                props.tour.ratings.map(rating => (
                    <li key={rating._id} className='li-small-border'>
                        <p>{rating.author.username} rated: </p>
                        <p>{rating.value} / 5</p>
                    </li>
                ))
            }
        </ul>
        <br/>
        <p>There is a maximum of {props.tour.max_capacity} spots</p>
        <p>There are {props.tour.max_capacity - props.tour.occupied_spots} spots available</p>
        <br/>
        <p><Link to={"/addBooking/" + props.tour._id}>Book tour</Link></p>
        <p>Any thoughts on the tour?</p>
        <p><Link to={"/addReview/" + props.tour._id}>Add review</Link> | <Link to={"/addRating/" + props.tour._id}>Add rating</Link></p>
    </div>
)

const Booking = props => (
    <div>
        <h4>Tour location: {props.booking.tour.location_name}</h4>
        <h5>Tour date: {props.booking.tour.date.toString().substr(0, 10)}</h5>
        <h5>Tour time: {props.booking.tour.time}</h5>
        <h5>Tour services: {props.booking.tour.services}</h5>
        <p>{props.booking.nr_tickets_adult}{props.booking.nr_tickets_adult === 1 ? " adult ticket" : " adult tickets"}</p>
        <p>{props.booking.nr_tickets_child}{props.booking.nr_tickets_child === 1 ? " child ticket" : " child tickets"}</p>
        <p>Total sum: {props.booking.total_sum}</p>
    </div>
)

class Dashboard_Tourist extends Component {
    constructor() {
        super();

        this.state = {
            search: '',
            tours: [],
            bookings: []
        };
    }

    componentDidMount() {
        axios.get('/tours/')
            .then(response => {
                this.setState({ tours: response.data });
            })
            .catch((error) => {
                console.log(error);
            })

        const { user } = this.props.auth;
        const id = user.id;

        axios.get('/bookings/getBookings/' + id)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ bookings: response.data });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateSearch = e => {
        this.setState({
            search: e.target.value.substr(0, 45)
        });
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        let filteredTours = this.state.tours.filter(
            (tour) => {
                return tour.city.indexOf(this.state.search) !== -1;
            }
        );

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
                        <div className="input-field col s6">
                            <input type="text"
                                value={this.state.search}
                                onChange={this.updateSearch}
                            />
                            <label>Search tours by city: </label>
                            <ul className="ul-tours">
                                {
                                    filteredTours.map(currentTour => (
                                        <li key={currentTour._id} className="li-tours">
                                            <Tour tour={currentTour} key={currentTour._id} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col s6">
                            <label>Booked tours details: </label>
                            <ul>
                                {
                                    this.state.bookings.map(currentBooking => (
                                        <li key={currentBooking._id} className="li-border">
                                            <Booking booking={currentBooking} key={currentBooking._id} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
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

Dashboard_Tourist.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard_Tourist);