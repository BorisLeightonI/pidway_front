import React, { useContext, useState } from 'react'
import { formContext } from '../contextos/context'
import { DELETE, LOCAL_API, MENSAJE_TIMEOUT } from '../utils/constantes';
import axios from 'axios';

function DeleteModal() {
  const {action, setAction, cita, setReload} = useContext(formContext);
  const [showMessage, setShowMessage] = useState();
  const handleCancel = ()=>setAction(null);
  const handleAccept = (e) =>{
    e.stopPropagation();
    axios.delete(`${LOCAL_API}/citas/${cita.id}`)
      .then(ans => {console.log(ans); setReload(p=>!p);})
      .then(()=>{
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, MENSAJE_TIMEOUT);
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='modal_container delete' hidden={action!==DELETE} onClick={handleCancel}>
      <h3>Eliminar cita {cita?.id}</h3>
      <h3>¿Está seguro?</h3>
      <br />
      <br />
      <button onClick={handleCancel}>Cancelar</button>
      <button onClick={handleAccept}>Aceptar</button>
      {showMessage&&
        <p className='deleted_message'>Cita Eliminada correctamente</p>
      }
    </div>
  )
}

export default DeleteModal