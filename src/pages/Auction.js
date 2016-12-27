import React, { Component } from 'react';

export default class Auction extends Component {
    render() {
        return (
            <h1>This is a auction page for auction ID: {this.props.params.aId}</h1>
        )
    }
}