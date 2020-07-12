import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateReview extends Component {
    constructor() {
        super() 

        this.state = {
            text: ''
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const review = {
            text: this.state.text
        }

        const { user } = this.props.auth;

        console.log(review);

        axios.post('/tours/addReview/' + this.props.match.params.id,
            {
                user: user,
                review: review
            })
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log("err", err);
            });

        window.location = '/dashboard';
    }

    render() {
        return (
            <div style={{ marginTop: "4rem" }}>
                <h3>Add Review</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Text review: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.text}
                            id="text"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Review" class="btn btn-large waves-effect waves-teal" />
                    </div>
                </form>
            </div>
        )
    }
}

CreateReview.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateReview);