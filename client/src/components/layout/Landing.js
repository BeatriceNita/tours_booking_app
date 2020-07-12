import React, { Component } from "react";
import './Landing.css';
import {Jumbotron} from 'react-bootstrap';

class Landing extends Component {
    render() {
        return (
            <div>
            <Jumbotron>
                <div className='text-wrapper'>
                    <h5>Welcome to the best tour booking app there is!</h5>
                    <p>If you don't have an account, you need to register first</p>
                </div>
            </Jumbotron>
            </div>
        );
    }
}

export default Landing;