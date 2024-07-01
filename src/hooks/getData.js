import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { LOCAL_API } from "../utils/constantes";
import { formContext } from "../contextos/context";

export const useGetData = (path) => {
  const { reload } = useContext(formContext);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  useEffect(()=>{console.log('EJECUCIÓN DE AXIOS GET');
    setLoading(true);
    axios.get(`${LOCAL_API}${path}`)
      .then(({data})=>setData(data))
      .catch(err => setError(err))
      .finally(()=>setLoading(false))
  },[path, reload]);

  return [data, error, loading];
}