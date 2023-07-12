import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import './PopupAfegirDiners.css';
import useMenu from "../Servicio/Servei_Menu";

export default function PopupEliminaMenu ({id}) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(id);
    const {eliminaMenu} = useMenu();

    useEffect(() =>{},[])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        eliminaMenu(value);
        handleClose();
    }

    return (
        <>
            <Button variant="danger" className="btn-sm" onClick={handleShow}>
                X
            </Button>
            <Modal show={show}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   className="PopupCompra"
                   onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: "#343a40"}}>
                    <Modal.Title>Vols eliminar el menú?</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Footer style={{backgroundColor: "#343a40"}}>
                        <Button variant="success" onClick={handleClose}>
                            Cancela
                        </Button>
                        <Button onClick={handleSubmit} variant="danger">
                            Elimina
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}