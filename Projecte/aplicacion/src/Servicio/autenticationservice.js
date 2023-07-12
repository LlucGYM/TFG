import React, {useCallback, useContext, useState} from 'react';
import Context from "../Context/UserContextProvider";

 export default function useUser () {
    const {jwt, setJWT, user, setUser, rol, setRol} = useContext(Context);
    const [invalid, setInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

     const login = useCallback((item) => {
         const cargoUtil = JSON.stringify(item);
         setIsLoading(true);
         fetch("http://localhost/IniciaSessio.php",{
             method:"POST",
             headers: {
                 "Content-Type": 'application/json'
             },
             body: cargoUtil
         }).then(res=>{
             return res.json()
         }).then((res)=>{
             if(!res) return setInvalid(true);
             window.sessionStorage.setItem('jwt',res['jwt']);
             window.sessionStorage.setItem('user',item['usuari']);
             window.sessionStorage.setItem('rol',res['rol']);
             setIsLoading(false);
             setRol(res['rol']);
             setUser(item['usuari']);
             setJWT(res['jwt']);
         }).catch(err => {
             setIsLoading(false);
             window.sessionStorage.removeItem('jwt');
             })
     }, [setJWT]);

     const logout = useCallback(() => {
         window.sessionStorage.removeItem('jwt');
         window.sessionStorage.removeItem('user');
         window.sessionStorage.removeItem('rol');
        setJWT(null);
        setUser(null);
     }, [setJWT, setUser])



     return{
         isLogged: Boolean(jwt),
         isLoading,
         login,
         logout,
         invalid,
         user,
         rol
     }
 };



