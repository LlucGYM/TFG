import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServeiVistaInfant from "../Servicio/Servei_VistaInfant";
import {useLocation, Redirect} from "wouter";
import InfantButton from "./InfantButton";
import VistaInfant from "./VistaInfant";
import CalendariDinamic from "./CalendariDinamic";
import VistaMenu from "./VistaMenus";

export default function HomePageUsu () {
    const {profiles, getInfant, fill} = ServeiVistaInfant();
    const [, navigate] =useLocation();


    useEffect(() => {
        getInfant();
    },[])

    const handleclick = (e) =>{
        e.preventDefault();
        navigate('/RegistreInfant')
    }
    const viewInfant = () =>{
        if(profiles != null) {
            return profiles.map((profile) =>
        <VistaInfant profile={profile}/>)
        }
    }




    return(
         <div>
                 {fill ? viewInfant() : <h1>Afegeix al teu fill</h1>}
                 <hr/>
             <div className="col-md-12">
                 <InfantButton name={"Afegir Infant"} onClick={handleclick}/>
             </div>
             <div className="col-md-12">
                 <div className="section-heading">
                     <h3>Tiquets</h3>
                     <ul className="lista-tiquets">
                         <li>Selecciona els dies que vulguis reservar.</li>
                         <li>Prem el botó de compra.</li>
                         <li>Selecciona el menú.</li>
                         <li>Selecciona que fill vindrà cada dia.</li>
                         <li>Fes el pagament dels Tiquets.</li>
                     </ul>
                 </div>

             </div>
             <div className="col-md-12">
                 <CalendariDinamic profiles={profiles}/>
             </div>

         </div>
    );
}