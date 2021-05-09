import { connectToDatabase } from '../utils/mongodb'
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import Modal from 'react-modal';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        let moonUnitPrice = props.moon.reduce(function(prev, curr) {
            return prev.unitPrice < curr.unitPrice ? prev : curr;
        }).unitPrice;
        this.state = {
            modalIsOpen: false,
            setIsOpen: false,
            page: 'buy',
            userCurrentBath: 100,
            moonUnitPrice: moonUnitPrice,
            inputTHBT: 0,
            inputMoon: 0,
            inputTolerance: 0
        }
        console.log(props)
    }

    requestBuyMoon() {
        let request = {
            inputMoon: this.state.inputMoon,
            inputTHBT: this.state.inputTHBT,
            inputTolerance: this.state.inputTolerance
        }
        fetch("/api/buyMoon", {method: 'POST', body: JSON.stringify(request)})
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <div>
            <Container fluid className="container contact">
                <Row className="container-row">
                    <Col md={3}>
                        <div>
                            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
                            <h2><a href="#buy" name="page" onClick={() => this.handleChangePage('buy')}>Buy</a></h2>
                            <h2><a href="#buy" name="page" onClick={() => this.handleChangePage('history')}>History</a></h2>
                        </div>
                    </Col>
                    {this.state.page === 'buy' ? <Col md={9}>
                        <div className="contact-form">
                            <div className="form-group">
                                <label className="control-label col-sm-12">Moon = {this.state.moonUnitPrice} THBT</label>
                                <label className="control-label col-sm-12">You have {this.state.userCurrentBath} THBT</label>
                            </div>
                        </div>
                         <div className="contact-form">
                            <div className="form-group">
                                <label className="control-label col-sm-12">Amount to buy (THBT)</label>
                                <div className="col-sm-10">
                                    <input className="form-control" id="inputTHBT" name="inputTHBT"
                                           value={this.state.inputTHBT} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-12">Amount MOON</label>
                                <div className="col-sm-10">
                                    <input className="form-control" id="inputMoon" name="inputMoon"
                                           value={this.state.inputMoon} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-12">Slippage Tolerance (%)</label>
                                <div className="col-sm-10">
                                    <input className="form-control" id="inputTolerance" name="inputTolerance"
                                           value={this.state.inputTolerance} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button className="btn btn-default" onClick={this.requestBuyMoon.bind(this)}>Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                        </Col>
                        :
                        <Col md={9}>
                            <div className="contact-form">
                            </div>
                        </Col>
                        }

                </Row>
                <style>{`
        body{
        background-color: #25274d;
        }
        .container-row {
            width: 100%;
        }
        .contact{
        padding: 4%;
        height: 100vh;
        justify-content: center;
            align-items: center;
            display: flex;
        }
        .col-md-3{
        background: #ff9b00;
        padding: 4%;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        }
        .contact-info{
        margin-top:10%;
        }
        .contact-info img{
        margin-bottom: 15%;
        }
        .contact-info h2{
        margin-bottom: 10%;
        }
        .col-md-9{
        background: #fff;
        padding: 3%;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        }
        .contact-form label{
        font-weight:600;
        }
        .contact-form button{
        background: #25274d;
        color: #fff;
        font-weight: 600;
        width: 25%;
        }
        .contact-form button:focus{
        box-shadow:none;
        }
       `}</style>

            </Container>
            </div>
        )
    }

}
