import React from "react";
import './ListDays.css';
import {Button} from "react-bootstrap";
import PopupCompra from "./PopupCompra";

export default function ListDays ({days, funcion, profiles}) {


    return (<div className="ListaDias">
                <h5>Dies Seleccionats</h5>
                <ul className="container">
                    {days.map((f, i) =>
                        <div className="row">
                            <div className="col-6">
                                <li>{f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()} </li>
                            </div>
                            <div className="col-4"><Button className="btn-sm" variant="danger" onClick={() => funcion(i)}>X</Button></div>
                        </div>
                    )}
                </ul>
                <PopupCompra className="Compra" type="submit" Dies={days} profiles={profiles}>Comprar</PopupCompra>
            </div>
        )
    }
