import React, {useEffect, useState}from 'react';
import './Header.css';
import {useLocation} from "wouter";
import useUser from "../Servicio/autenticationservice";
import {Navegador} from "./Navegador";
import useDiners from "../Servicio/Servei_Diners";



export default function Header() {
    const {isLogged, logout, user, rol} = useUser();
    const {diners, vistaDiners} = useDiners();
    const [, navigate] =useLocation();

    useEffect(()=>{
    },[isLogged, diners])

    const handleclick = e => {
        e.preventDefault();
        logout();
        navigate('/Homepage');
    }

    return(
        <div>
            <header className="page-heading header-text">

                {
                    isLogged ?
                        <Navegador name={user} rol={rol} saldo={diners} funcionsaldo={vistaDiners} onClick={handleclick}/>
                        :
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 LoginTitle">

                                    <h1 className=""> <i className="fas fa-apple-alt" style={{color: "#CE33FF"}}/> FastTickets</h1>
                                    <br/>
                                    <p className="subtitle"> Compra i gestiona facilment els tickets menjador de l'Escola dels teus fills</p>
                                </div>
                            </div>
                        </div>
                }

            </header>
        </div>

    );
}
