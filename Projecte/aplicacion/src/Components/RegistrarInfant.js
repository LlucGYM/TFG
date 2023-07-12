import React, {useState, useEffect} from 'react';
import {useLocation} from "wouter";
import './RegistrarInfant.css';
import InfantRegistre from "../Servicio/enviarRegistreInfant";

export default function RegistrarInfant(){
    const [profile, setProfile] = useState({});
    const [, navigate] =useLocation();
    const {registra, registrat, consultaCurs, cursos} = InfantRegistre();

    useEffect(() =>{
        consultaCurs();
        if(registrat) navigate('/Homepage');
    },[registrat])

    const handleChange = ({ target }) => {
        const  {name, value} = target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registra(profile)
    };

    const optionsCurs = () => {
        if(cursos !== null){
            return cursos.map((c) => <option value={c.idCurs}>{c.Nom}</option>)
        }
    }

    return(
        <div>
            <div className="container">
                <div className="abs-center">
                    <form onSubmit={handleSubmit} className=" p-2 form">
                        <div className="form-group">
                            <h4>Afegeix al teu fill</h4>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Nom">Nom</label>
                            <input value={profile.Nom || ''} type="text" name="Nom" id="Nom" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Cognoms">Cognoms</label>
                            <input value={profile.Cognoms || ''} type="text" name="Cognoms" id="Cognoms" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Edat">Edat</label>
                            <input value={profile.Edat || ''} type="number" name="Edat" id="Edat" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Curs">Curs</label>
                            <select name="Curs" id="Curs" className="form-control" onChange={handleChange} required>
                                <option value="0">Seleciona</option>
                                {optionsCurs()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Tutor">Tutor de l'infant</label>
                            <input value={profile.Tutor || ''} type="text" name="Tutor" id="Tutor" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Telefon">Teléfon Contacte</label>
                            <input value={profile.Telefon || ''} type="text" name="Telefon" id="Telefon" className="form-control" onChange={handleChange} maxLength="9" minLength="9" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Observacions">Observacions</label>
                            <input value={profile.Observacions || ''} type="text" name="Observacions" id="Observacions" className="form-control" onChange={handleChange} maxLength="50"/>
                        </div>
                        <button type="submit" className="btn btn-dark">Registrar infant</button>
                    </form>
                </div>
            </div>
        </div>
    );
}