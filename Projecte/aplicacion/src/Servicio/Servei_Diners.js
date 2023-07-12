import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function useDiners () {
    const {jwt} = useContext(Context);
    const [diners,setDiners] = useState(0);

    const vistaDiners = useCallback(() => {
        const item = JSON.stringify(jwt);
        fetch("http://localhost/vistaDiners.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: item
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error")
            }else {
                setDiners(parseInt(res));
            }
        });
    })

    const afegirDiners = useCallback((item) => {
        item['jwt'] = jwt;
        const carga = JSON.stringify(item);
        fetch("http://localhost/afegirDiners.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(res){
                alert("S'ha fet l'ingrés correctament");
            }else {
                alert("No s'ha pogut fer l'ingrés")
            }
        });
    })

    return{
        diners,
        vistaDiners,
        afegirDiners
    }
};