import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import useMenu from "../Servicio/Servei_Menu";
import "./VistaMenu.css";
import PopupEliminaMenu from "./PopupEliminaMenu";

export default function VistaMenu ({rol}) {
    const {vistaMenu, profilesmenus} = useMenu();
    const [dia, setDia] = useState(new Date());

    useEffect(() => {vistaMenu(tranformatext2(dia))
    }, [])

    const handleChange = ({target}) =>{
        const  {value} = target;
        vistaMenu(value);
    }
    const tranformatext2 = (f) => {
        const dia = f.getFullYear()+"-"+(f.getMonth() + 1)+"-"+ f.getDate();
        return dia;
    }

    const Menus = () =>{
        if(profilesmenus !== null){
            return profilesmenus.map((p) => <div className="col lista-menu">
                <div className="row">
                    <h4 className="col-auto">{p.IDtipus}</h4>
                    {rol === "Admin" ? <div className="col-auto btnElimina">
                        <PopupEliminaMenu id={p.idMenu}/>
                    </div> : null}
                </div>
                <ul>
                    <li>Primer: {p.Primer}</li>
                    <li>Segon: {p.Segon}</li>
                    <li>Postre: {p.Postre}</li>
                </ul>
            </div>)
        }else {
            return <div className="col lista-tiquets">
                <p>Encara no s'han afegit menús d'aquest dia.</p>
            </div>
        }
    }


    return (<><div className="abs-center">
        <Form>
            <Form.Group controlId="Data">
                <Form.Control type="date" name="Data" onChange={handleChange} />
            </Form.Group>
        </Form>
    </div>
        <div className="container">
            <div className="row Menu">
                {Menus()}
            </div>
        </div>
    </>);
}