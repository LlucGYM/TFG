import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

export default function ServeiTotsInfants() {
    const {jwt, setJWT} = useContext(Context);
    const [profiles, setProfiles] = useState(null);
    const [subscrits, setSubscrits] = useState(false);

    const  getInfants = useCallback(() => {
        const cargoUtil = JSON.stringify(jwt);
        fetch("http://localhost/TotsInfants.php", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: cargoUtil
        }).then(res => {
            return res.json()
        }).then((res) => {
            setProfiles(res);
            if(!res){
                setProfiles(null);
            } else {
                setSubscrits(true);
            }
        }).catch(e => alert(e));
    })


    return {
        profiles,
        getInfants,
        subscrits,
    }
}