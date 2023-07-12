import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
import './PopupAfegirDiners.css';
import useDiners from "../Servicio/Servei_Diners";

export default function PopupAfegirDiners () {
    const [show, setShow] = useState(false);
    const [Saldo, setSaldo] = useState(null);
    const {diners, afegirDiners, vistaDiners} = useDiners();


    useEffect(() =>{vistaDiners()},[])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setSaldo(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const item = {};
        item['Saldo'] = suma().toString();
        afegirDiners(item);
        handleClose();
    }
    const handleChange = ({target}) => {
        const {name, value} = target
        if (value != null){
            if(parseInt(value) < 0){
                alert("La quantitat ha de ser positiva.")
                setSaldo(parseInt(0));
            }else {
                setSaldo(parseInt(value))
            }
        }else {
            setSaldo(parseInt(0))
        }

    }

    const suma = () => {
        if(Saldo != null){
            return diners + Saldo;
        }
        else {
            return diners;
        }

    }

    return (
        <>
            <a style={{display: "block"}} onClick={handleShow}>
                Afegir Diners
            </a>
            <Modal show={show}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   className="PopupCompra"
                   onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: "#343a40"}}>
                    <Modal.Title>Afegeix l'import que vulguis abonar</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body style={{backgroundColor: "#343a40"}}>
                        <InputGroup  className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Import</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Saldo}
                                type={"number"}
                                placeholder={"20€"}
                                aria-label="Amount (to the nearest dollar)"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <h4 className="Disponible">Disponible: {diners}€</h4>
                        <h4 className="Afegir">A afegir: {Saldo !== null ? Saldo : 0}€</h4>
                        <h4 className="Total">Total: {suma()}€</h4>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#343a40"}}>
                        <Button variant="danger" onClick={handleClose}>Tancar
                        </Button>
                        <Button onClick={handleSubmit} variant="success">
                            Pagar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}