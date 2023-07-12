import React, {useEffect, useState} from "react";
import useTiquets from "../Servicio/Servei_CompraTiquets";
import {Button} from "react-bootstrap";
import './VistaTiquets.css';
import CursTitle from "./CursTitle";

export default function VistaTiquets() {
    const {vistaTiquets, tiquets, consultaInfant} = useTiquets();
    useEffect(() => {
        vistaTiquets();
    },[]);

    const header = ()=>{
        return <div className="row head">
            <div className="col ">
                <p className="centrado">Data</p>
            </div>
            <div className="col">
                <p className="centrado">Infant</p>
            </div>
            <div className="col">
                <p className="centrado">Pagat</p>
            </div>
            <div className="col">
                <p className="centrado"></p>
            </div>
        </div>
    }

    const Pagat = (tiquet) =>{
        if(tiquet.Pagat === "1") {
            return " Pagat"
        }else {
            return "";
        }
    }

    const transformaData = (data) =>{
        return   data.substr(8,2) + "/" + data.substr(5,2) + "/" + data.substr(0,4)
    }

    const ComparaDates = (tiquet, day) => {
        const dia=tiquet.Dia.substr(8,2);
        const mes=tiquet.Dia.substr(5,2)-1;
        const any=tiquet.Dia.substr(0,4);
        const tiquet_date = new Date(any,mes,dia)
        if(tiquet_date >= day){
            return true;
        }else {
            return false;
        }
    }


    const TiquetsActuals = () => {
        if(tiquets != null){
            const date = new Date();
            return tiquets.map((tiquet) => ComparaDates(tiquet, date) ?
                    <div className={"row Tiquet" + Pagat(tiquet)}>
                        <div className="col">
                            <p className="centrado">{transformaData(tiquet.Dia)}</p>
                        </div>
                        <div className="col">
                            <p className="centrado">{tiquet.IDAlumno}</p>
                        </div>
                        <div className="col">
                            {tiquet.Pagat === "0" ? <p className="centrado">No Pagat</p> : <p className="centrado">Pagat</p>}
                        </div>
                        <div className="col">
                            <Button>Veure</Button>
                        </div>
                    </div> : null
            )
        }
    }

    const TiquetsPassats = () => {
        if(tiquets != null){
            const date = new Date();
            return tiquets.map((tiquet) => ComparaDates(tiquet, date) ?
                null : <div className={"row Tiquet" + Pagat(tiquet)}>
                    <div className="col">
                        <p className="centrado ">{transformaData(tiquet.Dia)}</p>
                    </div>
                    <div className="col">
                        <p className="centrado">{tiquet.IDAlumno}</p>
                    </div>
                    <div className="col">
                        {tiquet.Pagat === "0" ? <p className="centrado">No Pagat</p> : <p className="centrado">Pagat</p>}
                    </div>
                    <div className="col">
                        <Button>Veure</Button>
                    </div>
                </div>
            )
        }else {
            return <h1>No s'ha comprat cap tiquet</h1>
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Tiquets</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    { tiquets != null  ?  <div className="service">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h3>Tiquets Actuals</h3>
                                </div>
                            </div>
                        <div className="container">
                            {header()}
                            {TiquetsActuals()}
                        </div>
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h3>Tiquets Passats</h3>
                            </div>
                        </div>
                        <div className="container">
                            {header()}
                            {TiquetsPassats()}
                        </div>
                    </div> : <h1>No s'ha comprat cap tiquet</h1>
                        }
                    </div>
            </div>
    </div>);
}