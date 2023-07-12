import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import './PopupCompra.css';
import useTiquets from "../Servicio/Servei_CompraTiquets";
import useMenu from "../Servicio/Servei_Menu";
import useDiners from "../Servicio/Servei_Diners";
import {useLocation} from "wouter";

export default function PopupCompra ({Dies, profiles}) {
    const [show, setShow] = useState(false);
    const [diaInfant, setDiaInfant] = useState();
    const {compraTiquets} = useTiquets();
    const {CategoriesMenu, menus} = useMenu();
    const [menu, setMenu] = useState({});
    const [total, setTotal] = useState(0);
    const {diners, afegirDiners, vistaDiners} = useDiners();
    const [, navigate] =useLocation();


    useEffect(() =>{CategoriesMenu();
    vistaDiners();}, [Dies]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setDiaInfant(null);
        setMenu(null);
        setTotal(0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(pagar()){
            compraTiquets(diaInfant,true);
            handleClose();
            navigate('/VistaTiquets');
        }
    }

    const handleChange = (val) => {
        setDiaInfant(val);
        totalPreu(val);
    }

    const handleMenu = ({target}) => {
        const  {name, value} = target;
        setMenu((prevPreu) => ({
            ...prevPreu,
            [name]: value
        }));
        setDiaInfant(null);
    }

    const pagar = () =>{
        if(total !== 0){
            if( diners-total <= 0){
                alert("Afegeix Diners");
                return false;
            }else {
                const item = {};
                item['Saldo'] = diners-total;
                afegirDiners(item);
                return true;
            }
        }else {
            return false;
        }
    }

    const totalPreu = (val) =>{
        if(val !== null){
            var aux = 0;
            val.map((d) => aux = aux + parseInt(consultaPreu(d.split(" ", 3)[2])))
            setTotal(aux);
        }
    }

    const tranformatext = (f) => {
        const dia = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ": ";
        return dia;
    }
    const tranformatext2 = (f) => {
        const dia = f.getFullYear()+"-"+(f.getMonth() + 1)+"-"+ f.getDate();
        return dia;
    }

    const tablaDias = () => {
        return <>
            {filaTipus()}
            <tr>
                <td>
                    Preu per menú:
                </td>
                <td className="row">
                    {preuInfant()}
                </td>
            </tr>
            {Dies.map((f) => <tr>
            <td className="Dia">
                {tranformatext(f)}
            </td>
            <td className="row">
                <ToggleButtonGroup className="col" type="checkbox" value={diaInfant} onChange={handleChange}>
                    {tablaInfant(f)}
                </ToggleButtonGroup>
            </td>
        </tr>)}
        </>
    }

    const tablaInfant = (f) => {
        if(profiles !== null){
            return profiles.map((p,i) =>
                <ToggleButton variant={"outline-primary"} value={p.idAlumne + " " + tranformatext2(f) + " " + menuTiquet(i)}>{p.Nom}</ToggleButton>
            )
        }else {
            return <h4>Registra al teu infant</h4>
        }
    }

    const filaTipus = () => {
        if(profiles !== null){
            return <tr>
                <td>
                    Menú:
                </td>
                <td>
                    <Form className="row">
                    {profiles.map((p, i) =>
                        <div className="col">
                            <Form.Control  as={"select"} name={i} id={i} onChange={handleMenu} >
                                <option value="0">Selecciona</option>
                                {tipusMenu()}
                            </Form.Control>
                        </div>
                    )}
                    </Form>
                </td>

            </tr>
        }
    }

    const tipusMenu = () => {
        if(menus !== null){
            return menus.map((m) => <option value={m.idTipus_Menu}>{m.Nom}</option>)
        }
    }

    const consultaPreu = (mp) => {
        var preu = 0;
        menus.map((m) => {
            if(m.idTipus_Menu === mp){
               preu = m.Preu;
            }
        })
        return preu;
    }

    const preuInfant = () => {
        if (profiles !== null && menu !== null) {
            return profiles.map((p, i) =>
                <p className="col">{menu[i] !== undefined ? consultaPreu(menu[i]) + "€" : "0€"}</p>
            )
        }
        if (profiles !== null && menu === null){
            return profiles.map((p, i) =>
                <p className="col">0€</p>
            )
        }
    }

    const menuTiquet = (i) => {
        if (menu !== null) {
            if(menu[i] !== undefined){
                return menu[i];
            }else {
                return "0";
            }
        }else {
            return "0";
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Compra
            </Button>
            <Modal show={show}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   className="PopupCompra"
                   onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: "#343a40"}}>
                    <Modal.Title>Selecciona el menú i els infants</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body style={{backgroundColor: "#343a40"}}>
                        {Dies.length === 0 ? <h4>Selecciona els dies</h4> :
                            <>
                                <Table borderless>
                                    <tbody>
                                        {tablaDias()}
                                    </tbody>
                                </Table>
                                <h5>Total: {total}€ </h5>
                                <h5>Disponible: {diners}€</h5>
                            </>}
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#343a40"}}>
                        <Button variant="danger" onClick={handleClose}>
                            Tancar
                        </Button>
                        <Button variant="success" type="submit">
                            Comprar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}