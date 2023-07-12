import React, {useCallback, useContext, useState} from 'react';

export default function useAssistencia () {
    const [tiquets,setTiquets] = useState(null);

    const vistaTiquets = useCallback((dia) => {
        const carga = JSON.stringify(dia);
        fetch("http://localhost/VistaAllTiquets.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("No hi ha alumnes inscrits aquest dia");
                setTiquets(null);
            }else {
                setTiquets(res);
            }
        });
    })

    return{
        tiquets,
        vistaTiquets,
    }
};