import React, { Component } from 'react';
import { Grid, Col, PageHeader, Panel, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import io from 'socket.io-client';

const PATH = "localhost:9998";

export default class Auction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            auctionInfo: []
        }
    }

    componentDidMount() {
        this.socket = io.connect(PATH+"/auction/"+this.props.params.aId);
        this.socket.on("auctionInfo", (info) => {
            this.setState({
                ready: true,
                auctionInfo: info
            });
        })
        this.socket.on("priceUpdate", (newPrice) => {
            var updated = this.state.auctionInfo;
            updated.price = newPrice;
            this.setState({
                auctionInfo: updated
            });
        })
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleBidSubmit = (form) => {
        form.preventDefault();
        var bid = parseInt(this.bid.value);
        if(!isNaN(bid)) {
            this.socket.emit("placeBid", bid);
        } else {
            alert("Please type in a number.")
        }
    }

    parseDate = function(dateString) {
        var date = new Date(dateString);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    render() {
        return !this.state.ready ? (
            <Grid>
                <h3>Connecting...</h3>
            </Grid>
        ) : (
            <Grid>
                <Col xs={12}>
                    <PageHeader>
                        {this.state.auctionInfo.name}
                    </PageHeader>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Details">
                        <p><b>Price:</b> {this.state.auctionInfo.price} DKK</p>
                        <p><b>Description:</b> {this.state.auctionInfo.description}</p>
                        <p><b>Quantity:</b> {this.state.auctionInfo.quantity}</p>
                        <p><b>Created date:</b> {this.parseDate(this.state.auctionInfo.createdDate)}</p>
                        <p><b>End date:</b> {this.parseDate(this.state.auctionInfo.endDate)}</p>
                    </Panel>
                </Col>
                <Col xs={12} md={6}>
                    <Panel header="Place your bid">
                        <form onSubmit={this.handleBidSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>DKK</InputGroup.Addon>
                                    <FormControl type="number" inputRef={(bid) => this.bid = bid} />
                                    <InputGroup.Addon>.00</InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" block>Place your bid</Button>
                        </form>
                    </Panel>
                </Col>
            </Grid>
        )
    }
}