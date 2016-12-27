import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { Grid } from 'react-bootstrap';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        )
    }
}