import React from "react";
import {Button, Card, Accordion} from "react-bootstrap";
import './VistaInfant.css';
import PopupAlert from "./PopupAlert";


export default function VistaInfant({profile}) {

    return(
        <div className="col-md-12">
        <div className="container ">
            <div className="row Infant">
            <Accordion className="col-10 Acordion">
                <Accordion.Toggle className="InfantTitle" variant={"dark"} eventKey="0" as={Card.Header}>
                    <h4>{profile.Nom} {profile.Congnom}</h4>
                </Accordion.Toggle>
                <Accordion.Collapse className="MenuInfant"  eventKey="0">
                    <div className="row ">
                        <div className="col-auto InfantText">
                            <p>Edat: {profile.Edat} anys</p>
                            <p>Curs: {profile.IDCurs}</p>
                        </div>

                        <div className="col-auto InfantText">
                            <h5>Observacions:</h5>
                            <p>{profile.Observacions}</p>
                        </div>

                        <div className="col-md-auto InfantText">
                            <h5>Persona de Contacte</h5>
                            <p>{profile.Tutor}</p>
                            <p>Telefon: {profile.telefon}</p>
                        </div>

                        <div className="col-auto btnEdita">
                            <Button variant="primary">Edita</Button>
                        </div>
                    </div>
                </Accordion.Collapse>
            </Accordion>
                <div className="col btnElimina">
                    <PopupAlert idInfant = {profile.idAlumne}/>
                </div>
            </div>
        </div>
        </div>
    )

}