import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import CalendariAdmin from "./CalendariAdmin";
import {Button} from "react-bootstrap";
import './CalendariDinamic.css';

export default function CalendariDinamicAdmin () {
    const [iMes,setiMes] = useState(0);
    const [Mes,setMes] = useState("");
    const [any,setAny] = useState();
    const mesos_text = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];

    useEffect(() =>{
        const dia_actual = new Date();
        const indexMes = dia_actual.getMonth();
        setAny(dia_actual.getFullYear());
        setiMes(indexMes);
        setMes(mesos_text[indexMes]);
    }, [])

    const avancaMes = () => {
        let indexMes = 0;
        if(iMes !== 11){
            indexMes = iMes + 1
            setiMes(indexMes);

        }else {
            indexMes = 0;
            setAny(any + 1);
            setiMes(indexMes);
        }
        setMes(mesos_text[indexMes]);
    }

    const retrocedeixMes = () => {
        let indexMes = 0;
        if(iMes !== 0){
            indexMes = iMes-1;
            setiMes(indexMes);
        }else {
            indexMes = 11;
            setAny(any - 1);
            setiMes(indexMes);
        }
        setMes(mesos_text[indexMes]);
    }


    return(
        <div className="Mes ">
            <div className={"container"}>

            <div className="row">
                <div className="col-auto"> <h2 className="titolMes">{any}</h2></div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <Button onClick={retrocedeixMes}><i className="fas fa-angle-left"/></Button>
                </div>
                <div className="col-auto">
                    <h2 className="titolMes">{Mes}</h2>
                </div>
                <div className="col-auto">
                    <Button  onClick={avancaMes}><i className="fas fa-angle-right"/></Button>
                </div>

            </div>

            <CalendariAdmin Any={any} Index={iMes}/>
            </div>

        </div>
    )
}