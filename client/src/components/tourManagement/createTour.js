import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateTour extends Component {
    constructor() {
        super();

        this.state = {
            city: '',
            location_name: '',
            date: new Date(),
            time: '',
            services: '',
            max_capacity: 0,
            price_adult: 0,
            price_child: 0,
            cities: [],
            locations: [],
            times: [
                "Select time..",
                "9AM",
                "10AM",
                "12PM",
                "1PM",
                "2PM"
            ]
        }
    }

    componentDidMount() {
        axios.get('/cities/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        cities: response.data.map(city => city.name),
                        city: response.data[0].name
                    })
                }
            });

        axios.get('/locations/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        locations: response.data.map(location => location.location_name),
                        location_name: response.data[0].location_name
                    })
                }
            });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    };

    onChangeDate = date => {
        this.setState({
            date: date
        })
    }

    onSubmit = e => {
        e.preventDefault();   //prevent the default html form submit behavior

        const tour = {
            city: this.state.city,
            location_name: this.state.location_name,
            date: this.state.date,
            time: this.state.time,
            services: this.state.services,
            max_capacity: this.state.max_capacity,
            price_adult: this.state.price_adult,
            price_child: this.state.price_child
        }

        const { user } = this.props.auth;

        console.log(tour);

        //send http post request to the backend endpoint
        axios.post('/tours/addTour',
            {
                user: user,
                tour: tour
            })
            .then(res => console.log(res.data));

        window.location = '/dashboard';
    }

    render() {
        return (
            <div style={{ marginTop: "4rem" }}>
                <h3>Create New Tour</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>City: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.city}
                            id="city"
                        >
                            {
                                this.state.cities.map(function (city) {
                                    return <option
                                        key={city}
                                        value={city}>{city}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.location_name}
                            id="location_name"
                        >
                            {
                                this.state.locations.map(function (location) {
                                    return <option
                                        key={location}
                                        value={location}>{location}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Pick date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Pick time: </label>
                        <select
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.time}
                            id="time">
                            {
                                this.state.times.map(function (time) {
                                    return <option key={time}
                                        value={time}>
                                        {time}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Services provided: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.services}
                            id="services"
                        />
                    </div>
                    <div className="form-group">
                        <label>Maximum capacity allowed: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.max_capacity}
                            id="max_capacity"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price for adult: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.price_adult}
                            id="price_adult"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price for child: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.price_child}
                            id="price_child"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Tour" class="btn btn-large waves-effect waves-teal" />
                    </div>
                </form>
            </div>
        )
    }
}

CreateTour.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateTour);