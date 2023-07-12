import React, {useState, useEffect} from 'react';
import {useLocation} from "wouter";
import './Registrar.css';
import Registre from "../Servicio/enviarRegistrar";

export default function Registrar(){
    const [profile, setProfile] = useState({});
    const [, navigate] =useLocation();
    const {registra, registrat, consultaEscoles, escoles} = Registre();
    useEffect(() =>{
        consultaEscoles();
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

    const optionsEscoles = () =>{
        if(escoles !== null){
            return escoles.map((e) => <option value={e.idEscola}>{e.Nom}</option>)
        }
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Registrar Usuari</h2>
                        </div>
                    </div>
                </div>
                <div className="row abs-center">
                    <form onSubmit={handleSubmit} className=" p-2 form">
                        <div className="form-group">
                            <label htmlFor="usuari">Usuari</label>
                            <input value={profile.usuari || ''} type="text" name="usuari" id="usuari" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={profile.email || ''} type="email" name="email" id="email" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Contrasenya</label>
                            <input value={profile.pass || ''} type="password" name="pass" id="pass" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repass">Repeteix Contrasenya</label>
                            <input value={profile.repass || ''} type="password" name="repass" id="repass" className="form-control" onChange={handleChange} maxLength="30" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="escola">Escola</label>
                            <select name="escola" id="escola" className="form-control" onChange={handleChange} required>
                                <option value="0">Seleciona</option>
                                {optionsEscoles()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol</label>
                            <select name="rol" id="rol" className="form-control" onChange={handleChange} required>
                                <option value="0">Seleciona</option>
                                <option value="User">Usuari</option>
                                <option value="Admin">Administrador</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-dark">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}