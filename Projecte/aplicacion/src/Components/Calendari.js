import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import { Button} from "react-bootstrap";
import ListDays from "./ListDays";

export default function Calendari ({Index, Any, profiles}) {
    const dies_text = ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"];
    const [value, setValue] = useState([]);

    const handleClick = (val) => {
        let find = false;
        for (let i=0; i<value.length; i++){
            if (val.getTime() === value[i].getTime()){
                find = true;
            }
        }
        if (!find){
            setValue(prevState => [...prevState,val]);
        }
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
                                        <Button   className={className} variant="info" disabled>{fecha.getDate()}</Button>

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

    const eliminaDia = (index) => {
        const listaActualizada = value.filter((day, i) => i !== index);
        setValue(listaActualizada);
    }


    return(<>
        <div className="row justify-content-center">
            <div className="col-auto margin">
                {createMes(Any, Index)}
            </div>
            <div className="col-auto">
                <ListDays days={value} funcion={eliminaDia} profiles={profiles}/>
            </div>
        </div>
    </>)
}