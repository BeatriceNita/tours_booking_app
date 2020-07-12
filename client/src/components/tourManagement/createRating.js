import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateRating extends Component {
    constructor() {
        super()

        this.state = {
            value: ""
        }
    }

    //target is the text box, e.target.value takes the value of that text box
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleRadioChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const rating = {
            value: this.state.value
        }

        const { user } = this.props.auth;

        console.log(rating);

        axios.post('/tours/addRating/' + this.props.match.params.id,
            {
                user: user,
                rating: rating
            })
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log("err", err);
            });

        window.location = '/dashboard'
    }

    render() {
        return (
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <h3>Add Rating</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div class="custom-control custom-radio">
                                <input
                                    type="radio"
                                    class="custom-control-input"
                                    name="defaultExampleRadios"
                                    id="opt1"
                                    value="1"
                                    checked={this.state.value === "1"}
                                    onChange={this.handleRadioChange} />
                                <label class="custom-control-label" for="opt1">1</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input
                                    type="radio"
                                    class="custom-control-input"
                                    name="defaultExampleRadios"
                                    id="opt2"
                                    value="2"
                                    checked={this.state.value === "2"}
                                    onChange={this.handleRadioChange} />
                                <label class="custom-control-label" for="opt2">2</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input
                                    type="radio"
                                    class="custom-control-input"
                                    name="defaultExampleRadios"
                                    id="opt3"
                                    value="3"
                                    checked={this.state.value === "3"}
                                    onChange={this.handleRadioChange} />
                                <label class="custom-control-label" for="opt3">3</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input
                                    type="radio"
                                    class="custom-control-input"
                                    name="defaultExampleRadios"
                                    id="opt4"
                                    value="4"
                                    checked={this.state.value === "4"}
                                    onChange={this.handleRadioChange} />
                                <label class="custom-control-label" for="opt4">4</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input
                                    type="radio"
                                    class="custom-control-input"
                                    name="defaultExampleRadios"
                                    id="opt5"
                                    value="5"
                                    checked={this.state.value === "5"}
                                    onChange={this.handleRadioChange} />
                                <label class="custom-control-label" for="opt5">5</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Rating" class="btn btn-large waves-effect waves-teal" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

CreateRating.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateRating);