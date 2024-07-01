import { createContext, useState } from "react"

export const formContext = createContext(); 
const ContextFormProvider = ({children})=>{
  const [cita, setCita] = useState({nombreCliente: "cliente1", fecha: "2024-06-28", hora: "13:57:25.123Z", descripcion: "descripción de cita."});

  return <formContext.Provider value={{cita, setCita}}>
    {children}
  </formContext.Provider>

}

export default ContextFormProvider;