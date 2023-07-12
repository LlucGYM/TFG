import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUser from "../Servicio/autenticationservice";
import HomePageAdmin from "./HomePageAdmin";
import HomePageUsu from "./HomePageUsu";
import { Redirect} from "wouter";

import './HomePage.css';
import VistaMenu from "./VistaMenus";

export default function HomePage () {
    const {isLogged, user, rol} = useUser();

    useEffect(()=>{
    }, [isLogged, user] )

    return(
        <div>
            { !isLogged ? <Redirect to={'/'}/> :
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Inici</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="service">
                            {
                            rol === 'Admin' ?
                                <HomePageAdmin/>
                                :
                                <HomePageUsu/>
                            }
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h3>Menus</h3>
                                    <ul className="lista-tiquets">
                                        <li>Selecciona la data per veure els menús del dia.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <VistaMenu rol={rol}/>
                            </div>
                        </div>
                    </div>
                </div>
                }
        </div>
    );
}



