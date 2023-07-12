import React, {Component} from "react";
import {Accordion, Card} from "react-bootstrap";
import './CurseTitle.css'
export default class CursTitle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "fa fa-chevron-right" };
        this.rotate = this.rotate.bind(this);
    }

    rotate () {
        if(this.state.name === "fa fa-chevron-right"){
            this.setState({name : "fa fa-chevron-right rotate"})
        }else {
            this.setState({name : "fa fa-chevron-right"})
        }
    }

    render() {
        return(
            <Accordion className="CursDia">
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={this.rotate}>
                    <div className="container">
                        <div className="TitleCursDia row justify-content-between" >
                            <div className={"col-4"}>
                                <h2>{this.props.curs}</h2>
                            </div>
                            <div className="col-1">
                                <i className={this.state.name}/>
                            </div>
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">

                    <Card.Body>
                        {this.props.titols !== undefined ? <div className="container">

                            {this.props.titols()}
                        </div>

                            : null}

                        {this.props.infants(this.props.curs)}
                    </Card.Body>
                </Accordion.Collapse>
        </Accordion>)
    }
}