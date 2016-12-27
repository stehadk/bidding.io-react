import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Bidding.io</Link>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}