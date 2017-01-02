import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import AuctionPanel from '../components/AuctionPanel';

export default class Frontpage extends Component {

    render() {
        return (
            <Grid>
                <div className="page-header">
                    <h1>Welcome to bidding.io</h1>
                    <p className="lead">Basic auction system using REST and Socket.io to update data and React as web-app framework.</p>
                </div>
                <AuctionPanel/>
            </Grid>
        )
    }
}