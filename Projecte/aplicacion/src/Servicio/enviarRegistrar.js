import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function Registre() {
    const {jwt} = useContext(Context);
    const [registrat, setRegistrat] = useState(false);
    const [escoles, setEscoles] = useState(null);

    const registra = useCallback((item) => {
        const cargoUtil = JSON.stringify(item);
        fetch("http://localhost/registrarse.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(res){
                setRegistrat(res);
                alert("Registre correcte")
            }else{
                alert("Registre incorrecte, revisa les credencials")
            }
        }).catch(e => alert(e));
    })

    const consultaEscoles = useCallback(() => {
        const cargoUtil = JSON.stringify(jwt);
        fetch("http://localhost/ConsultaEscola.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error consulta escoles");
            }else{
                setEscoles(res);
            }
        }).catch(e => alert(e));
    })

    return {
        registra,
        registrat,
        consultaEscoles,
        escoles
    }
}