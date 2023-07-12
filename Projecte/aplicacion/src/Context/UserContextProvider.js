import React,  {useState} from 'react';

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'));
    const [user, setUser] = useState(() => window.sessionStorage.getItem('user'));
    const [rol, setRol] = useState(() => window.sessionStorage.getItem('rol'));

    return <Context.Provider value={{jwt,setJWT,user,setUser, rol, setRol}}>{children}</Context.Provider>
}

export default Context
