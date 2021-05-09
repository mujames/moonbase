import { connectToDatabase } from '../utils/mongodb'
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import Cookies from 'universal-cookie';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        let moonUnitPrice = props.moon.length ? props.moon.reduce(function(prev, curr) {
            return prev.unitPrice < curr.unitPrice ? prev : curr;
        }).unitPrice : null;
        const cookies = new Cookies();
        cookies.set('user_id', cookies.get('user_id') || this.uuidv4(), { path: '/' });
        this.state = {
            userId: cookies.get('user_id'),
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

    uuidv4() {
        return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
        this.resolveCalculate(event.target.name, event.target.value)
    }

    handleChangePage(page) {
        if(page === 'history') {
            this.requestMoonHistory().then(history =>
                this.setState({page, history})
            )
        } else {
            this.setState({page})
        }
    }

    resolveCalculate(name, value) {
        if(name === "inputTHBT") this.setState({inputMoon: value/this.state.moonUnitPrice})
        else if(name === "inputMoon") this.setState({inputTHBT: value*this.state.moonUnitPrice})
    }

    async requestMoonHistory() {
        return await fetch("/api/getHistory")
            .then(response => response.json())
    }

    componentWillMount(){
        setInterval(() => {
            fetch('/api/getMin')
                .then(res => res.json())
                .then(json => {
                    let moonUnitPrice = json.length ? json.reduce(function(prev, curr) {
                        return prev.unitPrice < curr.unitPrice ? prev : curr;
                    }).unitPrice : null;
                    this.setState({moonUnitPrice: moonUnitPrice})
                });
        }, 2500);
    }

    requestBuyMoon() {
        let request = {
            userId: this.state.userId,
            inputMoon: this.state.inputMoon,
            inputTHBT: this.state.inputTHBT,
            inputTolerance: this.state.inputTolerance,
            userTHBT: this.state.userCurrentBath
        }
        fetch("/api/buyMoon", {method: 'POST', body: JSON.stringify(request)})
            .then(response => response.json())
            .then(result => {
                if(result.error) throw Error(result.error)
                window.location.href = "/success?moon=" + result.moon + "&thb=" + result.price;
            })
            .catch(error => {
                console.log('eeee' + error)
                window.location.href = "/error?message=" + error;
            });
    }

    render() {
        return (
            <div>
            <Container fluid className="container contact">
                <Row className="container-row">
                    <Col md={3}>
                        <div>
                            <h2><a href="#buy" name="page" onClick={() => this.handleChangePage('buy')}>Buy</a></h2>
                            <h2><a href="#history" name="page" onClick={() => this.handleChangePage('history')}>History</a></h2>
                        </div>
                    </Col>
                    {this.state.page === 'buy' ? <Col md={9}>
                        {!this.state.moonUnitPrice ? <div className="contact-form">
                                <div className="form-group">
                                    <h4 className="control-label col-sm-12">No Moon left to sell....</h4>
                                </div>
                            </div>
                            :
                            <div>
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
                            </div>}
                            </Col>
                        :
                        <Col md={9}>
                            <div className="contact-form">
                                <table>
                                    <tr>
                                        <th>Date and time</th>
                                        <th>ID</th>
                                        <th>THBT</th>
                                        <th>MOON</th>
                                        <th>RATE</th>
                                    </tr>
                                    {
                                        this.state.history.map((r) => {
                                            return (<tr>
                                                <td>{r.user_id}</td>
                                                <td>{r.date}</td>
                                                <td>{r.price}</td>
                                                <td>{r.moon}</td>
                                                <td>1 MOON = {r.price} | {r.moon/r.price}</td>
                                            </tr>)
                                        })
                                    }
                                </table>
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
            max-height: 90vh;
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

export async function getServerSideProps(context) {
    const { client, db} = await connectToDatabase()

    let moon =  await db.collection("moon-coin").find({amount: { $ne: 0 }})
       .sort({ unitPrice: 1 })
       .limit(1)
       .toArray()
    console.log(moon)
    moon = JSON.parse(JSON.stringify(moon))

  const isConnected = await client.isConnected()

  return {
    props: { isConnected, moon },
  }
}
