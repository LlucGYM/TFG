import React, {useState, useEffect} from 'react';
import './Login.css';
import {useLocation} from "wouter";
import useUser from "./Servicio/autenticationservice";
import {Alert} from "react-bootstrap";


export default function Login(){
    const [profile, setProfile] = useState({})
    const [, navigate] =useLocation();
    const {login, isLogged, invalid, isloading} = useUser();

    useEffect(() => {
        if(isLogged){
            navigate('/Homepage');
        }
    }, [isLogged, navigate])

    const handleChange = ({ target }) => {
        const  {name, value} = target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login(profile)
    };



    return(
        <div>
            {
                isLogged ? navigate('/HomePage') : null
            }
            { isloading  && <strong>Cheking credentials...</strong>}

            { !isloading && <div className="container">
                <div className="abs-center">
                    <form onSubmit={handleSubmit} className=" p-2 form">
                        <div className="form-group">
                            <h4>Inicia sessió</h4>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usuari">Usuari</label>
                            <input value={profile.usuari || ''} type="text" name="usuari" id="usuari"
                                   className="form-control" onChange={handleChange} minLength={"1"}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Contraseña</label>
                            <input value={profile.pass || ''} type="password" name="pass" id="pass"
                                   className="form-control" onChange={handleChange} minLength={"1"}/>
                        </div>
                        <button type="submit" className="btn btn-dark">Login</button>
                    </form>
                </div>
                <div className="row justify-content-center">
                    {
                        invalid ?
                            <Alert className="Alert" variant={"danger"}><p className="Alert-text">Revisa l'usuari i
                                contrasenya</p></Alert> : null
                    }
                </div>
            </div>}
        </div>
    );

}
