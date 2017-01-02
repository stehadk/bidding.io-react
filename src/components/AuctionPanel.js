import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { Link } from 'react-router';

const URL = "http://localhost:9998";
const RELOAD_INTERVAL = 2000; // ms

export default class AuctionPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctions: [],
            error: false
        }
    }

    get(url, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4)
                callback(xmlHttp.status, xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    };

    reloadAuctions() {
        console.log("Reloading auctions...");
        var thisUrl = URL + "/auctions";
        this.get(thisUrl, (status, content) => {
            if (status === 200) {
                this.setState({
                    auctions: JSON.parse(content)
                })
            } else {
                clearInterval(this.timerId);
                console.error("REST return code != 200. Got: "+status);
                this.setState({ error: true });
            }
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
                        {this.state.error && (
                            <tr className="danger">
                                <td colSpan="4" style={{ textAlign: "center" }}>Something went wrong. Please try again later. See the console for more information.</td>
                            </tr>
                        )}
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