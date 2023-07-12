import React, {useCallback, useEffect, useState} from "react";
import {Accordion, Button, Card, Form} from "react-bootstrap";
import useAssistencia from "../Servicio/Servei_Assistencia";
import LlistaTiquets from "./VistaTiquetsDia";
import "./VistaTiquetsDia.css";
import CursTitle from "./CursTitle";


export default function CalendariAdmin ({Index, Any}) {
    const dies_text = ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"];
    const cursos = ["P3","P4","P5","1r","2n","3r","4t","5e","6e"];
    const [value, setValue] = useState([]);
    const {vistaTiquets, tiquets} = useAssistencia();

    useEffect(() => {},[tiquets]);

    const handleClick = (val) => {
        const dia = val.getFullYear()+"-"+(val.getMonth() + 1)+"-"+ val.getDate();
        vistaTiquets(dia);
    }

    const createMes = (any, iMes) => {
        return (createTabla(any,iMes))
    }

    const createTabla = (any,iMes) => {

        return <table>
            {createTitolDies()}
            {createSetmanes(any,iMes)}
        </table>

    }

    const createTitolDies = () => {
        return (
            <tr>
                {dies_text.map((dia) => <th>{dia}</th>)}
            </tr>
        )
    }

    const createSetmanes = (any,iMes) =>{
        const fechas = numerate(any,iMes);
        const dia_actual = new Date();
        let counter = 0;
        const dias_mes = diasEnUnMes(iMes+1,any);
        const setmanes = [];
        let className = "day ";

        for(let i = 0; i < 6; i++){
            const dies = [];
            for(let j = 0; j < 7; j++){
                if(counter < dias_mes) {
                    const fecha = fechas[counter];
                    let dia_semana = fecha.getDay();

                    if(dia_semana === 0){
                        dia_semana = 6;
                    }else {
                        dia_semana--;
                    }

                    if(fecha.getDay() === dia_actual.getDay() && fecha.getDate() === dia_actual.getDate() && fecha.getMonth() === dia_actual.getMonth()){
                        className += "activation";
                    }else {
                        className = "day ";
                    }

                    if(dia_semana === j){
                        if(dia_semana === 5 || dia_semana === 6){
                            dies.push(<td>
                                <Button  className={className} variant="dark" disabled>{fecha.getDate()}</Button>
                            </td>)
                        }else{
                            if(fecha < dia_actual ){
                                dies.push(<td>
                                    <Button   className={className} onClick={() => handleClick(fecha)}>{fecha.getDate()}</Button>

                                </td>)
                            }else {
                                dies.push(<td>
                                    <Button className="day" onClick={() => handleClick(fecha)}>{fecha.getDate()}</Button>
                                </td>)
                            }
                        }
                        counter++;
                    }else {
                        dies.push(<td></td>);
                    }
                }
            }
            setmanes.push(<tr>{dies}</tr>)
        }
        return(setmanes)
    }

    function DataPerDia(any,iMes,dia) {
        var date = new Date(any,iMes, dia);
        return new Date(date.setDate(dia))
    }

    function numerate(any,iMes){
        let fechas = []
        for (let i = 1; i <= diasEnUnMes(iMes+1, any); i++) {
            let fecha = DataPerDia(any,iMes, i);
            fechas.push(fecha);
        }
        return (fechas)
    }

    function diasEnUnMes(mes, any) {
        return new Date(any, mes, 0).getDate();
    }

    const cursHeading = useCallback( () => {
        return cursos.map((curs, i) =>
            <CursTitle curs={curs} titols={titols} infants={viewInfants}  />
        )
    })

    const viewInfants = (curs) =>{
        if (tiquets != null) {
            return tiquets.map((t) => t.IDAlumno.IDCurs === curs ?
                <LlistaTiquets tiquet={t}/> : null)
        } else {
            return <h1>No hi ha infants</h1>
        }

    }

    function titols() {
        return  <div className={"row head"} >
            <p className="col">ID</p>
            <p className="col">Alumne</p>
            <p className="col">Pagat</p>
            <p className="col">Menú</p>
        </div>
    }

    return(<>
        <div className="row">
            <div className="col-auto margin">
                {createMes(Any, Index)}
            </div>
        </div>

        {tiquets !== null ? <>
            <Form>
                <ul className="container">
                  {cursHeading()}
                </ul>
            </Form> </>
            : null}
    </>)
}