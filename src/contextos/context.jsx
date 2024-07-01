import { createContext, useState } from "react"

export const formContext = createContext(); 
const ContextFormProvider = ({children})=>{
  const [cita, setCita] = useState({});
  const [action, setAction] = useState(null)
  const [reload, setReload] = useState(false);

  return <formContext.Provider value={{cita, setCita, action, setAction, setReload, reload}}>
    {children}
  </formContext.Provider>

}

export default ContextFormProvider;