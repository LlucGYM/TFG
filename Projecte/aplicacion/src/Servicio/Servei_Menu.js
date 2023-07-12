import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function useMenu () {
    const {jwt} = useContext(Context);
    const [afegit, setAfegit] = useState(false);
    const [menus, setMenus] = useState(null);
    const [profilesmenus, setProfilesMenus] = useState(null);

    const afegirMenu = useCallback((item) => {
        item['jwt'] = jwt;
        const carga = JSON.stringify(item);
        fetch("http://localhost/afegirMenu.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(res){
                alert("S'ha afegit el menú correctament");
                setAfegit(true);
            }else {
                alert("No s'ha pogut afegir el menú");
            }
        });
    })

    const eliminaMenu = useCallback((item) => {
        const carga = JSON.stringify(item);
        fetch("http://localhost/EliminaMenu.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(res){
                window.location.reload();
                alert("S'ha eliminat el menú correctament");
            }else {
                alert("No s'ha pogut eliminar el menú");
            }
        });
    })

    const CategoriesMenu = useCallback(() => {
        const carga = JSON.stringify(jwt);
        fetch("http://localhost/CategoriesMenu.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                alert("No es pot visualitzar");
            }else {
                setMenus(res);
            }
        });
    })

    const vistaMenu = useCallback((val) => {
        const carga = JSON.stringify(val);
        fetch("http://localhost/VistaMenus.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: carga
        }).then(res => {
            return res.json()
        }).then((res) => {
            if(!res){
                setProfilesMenus(null);
            }else {
                setProfilesMenus(res);
            }
        });
    })



    return{
        afegirMenu,
        afegit,
        CategoriesMenu,
        menus,
        vistaMenu,
        profilesmenus,
        eliminaMenu
    }
};