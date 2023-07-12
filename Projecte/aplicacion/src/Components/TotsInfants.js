import React, {useCallback, useEffect} from "react";
import ServeiTotsInfants from "../Servicio/Servei_TotsInfants";
import './TotsInfants.css';
import InfantList from "./InfantList";
import CursTitle from "./CursTitle";
import InfantRegistre from "../Servicio/enviarRegistreInfant";

export default function  TotsInfants () {

    const {profiles, getInfants, subscrits} = ServeiTotsInfants();
    const {consultaCurs, cursos} = InfantRegistre();
    var isBackgroundblack = true;

    useEffect(() =>{
        consultaCurs();
        getInfants();
    },[])

    const cursHeading = useCallback( () => {
        if(cursos !== null){
            return cursos.map((curs) =>
                <CursTitle curs={curs.Nom} infants={viewInfants} />
            )
        }
    })

    const changeColor = () => {
        if(isBackgroundblack){
            isBackgroundblack = false;
            return '#0d97e2';
        }else {
            isBackgroundblack = true;
            return '#343a40'
        }
    }

    const viewInfants = (curs) =>{
        if (profiles != null) {
            return profiles.map((profile) => profile.IDCurs === curs ?
                <InfantList profile={profile} background={changeColor}/>: null)
        } else {
            return <h1>No hi ha infants</h1>
        }

    }



    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-heading">
                        <h2>Tots els Infants</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {cursHeading()}
                </div>
            </div>
        </div>
    )

}