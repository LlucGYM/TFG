import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
import useMenu from "../Servicio/Servei_Menu";
import {useLocation} from 'wouter';
export default function AfegirMenu () {
    const [menu, setMenu] = useState({});
    const {afegirMenu, afegit} = useMenu();
    const [, navigate] =useLocation();
    const {CategoriesMenu, menus} = useMenu();


    useEffect(() =>{
        CategoriesMenu();
        if(afegit) navigate('/Homepage');
    },[afegit])


    const handleSubmit = (event) => {
        event.preventDefault();
        if(menu == null){
            alert("Omple la data i el tipus de menú com a minim");
        }else {
            afegirMenu(menu);
        }
    }
    const handleChange = ({target}) => {
        const  {name, value} = target;
        setMenu((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));

    }
    const tipusMenu = () => {
        if(menus !== null){
            return menus.map((m) => <option value={m.idTipus_Menu}>{m.Nom}</option>)
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-heading">
                        <h2>
                            Afegir Menu
                        </h2>
                    </div>
                </div>
            </div>
            <div className="abs-center">
                <Form onSubmit={handleSubmit} className={"p-2 form"}>
                    <Form.Group controlId="Data">
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" name="Data" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="Primer">
                        <Form.Label>Primer</Form.Label>
                        <Form.Control type="text" name="Primer" placeholder="Primer" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="Segon">
                        <Form.Label>Segon</Form.Label>
                        <Form.Control type="text" name="Segon" placeholder="Segon" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="Postre">
                        <Form.Label>Postre</Form.Label>
                        <Form.Control type="text" name="Postre" placeholder="Postre" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipus</Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="Tipus"
                            name="Tipus"
                            onChange={handleChange}
                        >
                            <option value="0">Selecciona</option>
                            {tipusMenu()}
                        </Form.Control>
                    </Form.Group>
                    <Button type={"submit"} variant="dark">
                        Afegir
                    </Button>
                </Form>
            </div>
        </div>
    );
}