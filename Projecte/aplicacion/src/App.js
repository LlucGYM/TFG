import './App.css';
import React, {useEffect, useState} from "react";
import {Switch, Route, useLocation} from "wouter";

import HomePage from './Components/HomePage.js';
import Header from './Components/Header';
import Registrar from "./Components/Registrar";
import RegistrarInfant from "./Components/RegistrarInfant";
import TotsInfants from "./Components/TotsInfants";
import VistaTiquets from "./Components/VistaTiquets";

import Login from './Login.js'
import useUser from "./Servicio/autenticationservice";
import {UserContextProvider} from "./Context/UserContextProvider";
import AfegirMenu from "./Components/AfegirMenu";


export default function App () {
    const {isLogged} = useUser();
    const [, navigate] =useLocation();

    useEffect(() => {
        if(!isLogged) {navigate('/')}
    }, [isLogged, navigate])

  return (
      <UserContextProvider>
          <div>
              <Header/>
              <Switch>
                  <Route component={HomePage} path="/Homepage"/>
                  <Route component={VistaTiquets} path="/VistaTiquets" />
                  <Route component={Registrar} path="/Registre" />
                  <Route component={TotsInfants} path="/TotsInfants" />
                  <Route component={RegistrarInfant} path="/RegistreInfant" />
                  <Route component={AfegirMenu} path="/AfegirMenu" />
                  <Route component={Login} path="/"/>
              </Switch>
          </div>
      </UserContextProvider>

  );
}


