import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from 'reactstrap';
import './createBooking.css';

class CreateBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nr_tickets_adult: 0,
            nr_tickets_child: 0,
            nr_bookings: 0,
            errorMessage: ''
        }
    }

    //target is the text box, e.target.value takes the value of that text box
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    closeReservation = () => {
        window.location = '/dashboard';
    }

    onSubmit = (e) => {
        e.preventDefault();   //prevent the default html form submit behavior

        const booking = {
            nr_tickets_adult: this.state.nr_tickets_adult,
            nr_tickets_child: this.state.nr_tickets_child
        }

        const { user } = this.props.auth;

        const tour_id = this.props.match.params.id;

        axios.post('/bookings/addBooking',
            {
                user: user,
                tour_id: tour_id,
                booking: booking
            })
            .then(res => {
                console.log(res.data);
                window.location = '/dashboard';
            })
            .catch((err) => {
                console.log(err.response.data)
                if (err.response.status === 400) {
                    this.setState({ errorMessage: err.response.data });
                }
            })
    }

    render() {
        return (
            <div style={{ marginTop: "4rem" }}>
                <h3>Create New Booking</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nr of tickets for adults: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.nr_tickets_adult}
                            name="nr_tickets_adult"
                        />
                    </div>
                    <div className="form-group">
                        <label>Nr of tickets for children: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.nr_tickets_child}
                            name="nr_tickets_child"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Booking" class="btn btn-large waves-effect waves-teal" />
                    </div>
                </form>
                {this.state.errorMessage &&
                    <div className="error">
                        <h5 className="err-border"> {this.state.errorMessage} </h5>
                        <Button onClick={this.closeReservation}>Cancel Booking</Button>
                    </div>
                }
            </div>
        )
    }
}

CreateBooking.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateBooking);