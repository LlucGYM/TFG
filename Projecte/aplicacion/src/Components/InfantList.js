import React from "react";
import {Accordion, Button} from "react-bootstrap";

export default class InfantList extends React.Component{

    render() {
        return (
                <Accordion  className={"infantAcordeon"} style={{backgroundColor: this.props.background()}}>
                    <Accordion.Toggle className="NomInfant" eventKey="0" as={Button} variant={"link"}>
                        <p>{this.props.profile.Nom} {this.props.profile.Congnom}</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse className="container collapseALL" eventKey="0">
                        <div className="row ">
                            <p className={"col"}>Edat: {this.props.profile.Edat}</p>
                            <p className={"col"}>Observacions: {this.props.profile.Observacions}</p>
                            <p className={"col"}>Tutor: {this.props.profile.Tutor} </p>
                            <p className={"col"}>Telèfon: {this.props.profile.telefon}</p>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
        )
    }
}