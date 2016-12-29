import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { Link } from 'react-router';

const URL = "http://localhost:9998";
const RELOAD_INTERVAL = 2000; // ms

export default class AuctionPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctions: []
        }
    }

    get(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    };

    reloadAuctions() {
        console.log("Reloading auctions...");
        var thisUrl = URL + "/auctions";
        this.get(thisUrl, (content) => {
            this.setState({
                auctions: JSON.parse(content)
            })
        })

    }

    componentDidMount() {
        this.reloadAuctions();
        this.timerId = setInterval(() => this.reloadAuctions(), RELOAD_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <Panel header="Current active auctions">
                <Table responsive fill>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Auction title</th>
                            <th>Current bidding</th>
                            <th>Auction ends at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.auctions.map((auction) => {
                            return (
                                <tr key={auction.id}>
                                    <td>{auction.id}</td>
                                    <td><Link to={"auction/" + auction.id}>{auction.name}</Link></td>
                                    <td>{auction.price}</td>
                                    <td>{auction.endDate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Panel>
        )
    };
}