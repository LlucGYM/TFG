import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function InfantRegistre() {
    const {jwt, setJWT} = useContext(Context);
    const [registrat, setRegistrat] = useState(false);
    const [cursos, setCursos] = useState(null);

    const registra = useCallback((item) => {
        item['jwt'] = jwt;
        const cargoUtil = JSON.stringify(item);
        fetch("http://localhost/RegistrarInfant.php", {
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

    const consultaCurs = useCallback(() => {
        const cargoUtil = JSON.stringify(jwt);
        fetch("http://localhost/ConsultaCurs.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error consulta curs");
            }else{
                setCursos(res);
            }
        }).catch(e => alert(e));
    })

    return {
        registra,
        registrat,
        cursos,
        consultaCurs
    }
}