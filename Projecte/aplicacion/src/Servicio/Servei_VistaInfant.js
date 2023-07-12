import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function ServeiVistaInfant() {
    const {jwt} = useContext(Context);
    const [profiles, setProfiles] = useState(null);
    const [fill, setFill] = useState(false);

    const getInfant = useCallback(() => {
        const cargoUtil = JSON.stringify(jwt);
        fetch("http://localhost/vistaInfant.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){  return setFill(false)} else {
                setFill(true);
            }
            setProfiles(res);
        }).catch(e => alert(e));
    })

    const deleteInfant = useCallback((item) => {
        item['jwt'] = jwt;
        const cargoUtil = JSON.stringify(item);
        fetch("http://localhost/deleteInfant.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(res){
                alert("S'ha eliminat correctament")
                window.location.reload();
            } else {
                alert("Error en la eliminació");
            }
        }).catch(e => alert(e));
    })

    return {
        profiles,
        getInfant,
        fill,
        deleteInfant
    }
}