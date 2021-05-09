import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export default class Success extends React.Component {

    static async getInitialProps ({ query }) {
        return {
            thb: query.thb,
            moon: query.moon
        }
    }

    constructor(props) {
        super(props);
    }

    backToHome() {
        window.location.href = "/";
    }

    render() {
        return (
            <div>
            <Container fluid className="container contact">
                <Row className="container-row body">
                    <Col md={12}>
                        <div className="contact-form">
                            <div className="form-group">
                                <label className="control-label col-sm-12">Success</label>
                                <label className="control-label col-sm-12">You bought {this.props.moon} Moon</label>
                                <label className="control-label col-sm-12">with {this.props.thb} THBT</label>
                                <br/>
                                <button className="btn btn-default" onClick={this.backToHome.bind(this)}>Buy more
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <style>{`
        body{
        background-color: white;
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
