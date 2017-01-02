import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

export default class Auction extends Component {

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Grid>
                <h1>This is a auction page for auction ID: {this.props.params.aId}</h1>
            </Grid>
        )
    }
}