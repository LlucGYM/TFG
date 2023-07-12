import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function useTiquets () {
    const {jwt} = useContext(Context);
    const [tiquets,setTiquets] = useState();

    const compraTiquets = useCallback((dies, pagat) => {
        const item = {};
        item['dies'] = dies;
        item['jwt'] = jwt;
        item['pagat'] = pagat;
        const carga = JSON.stringify(item);
        fetch("http://localhost/CompraTiquets.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error en la compra");
            }else {
                alert("La compra s'ha realitzat correctament");
                window.location.reload();
            }
        });
    })

    const vistaTiquets = useCallback(() => {
        const carga = JSON.stringify(jwt);
        fetch("http://localhost/VistaTiquets.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error al carregar els tiquets");
            }else {
                setTiquets(res);
            }
        });
    })

    const consultaInfant = useCallback(() => {
        const carga = JSON.stringify(jwt);
        fetch("http://localhost/ConsultaInfant.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("Error al carregar els Tiquets");
            }else {
                setTiquets(res);
            }
        });
    })


    return{
        compraTiquets,
        tiquets,
        vistaTiquets,
        consultaInfant
    }
};