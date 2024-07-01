import React, { useContext } from 'react'
import { formContext } from '../contextos/context'
import { CREATE, EDIT, SHOW } from '../utils/constantes';
import Formulario from './formulario';
import './detallesmodal.css'

function DetallesModal() {
  const {cita, action, setAction} = useContext(formContext);
  const handleModalClick = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    setAction(null)
  };
  return (
    <div className='modal_container' hidden={!(action===SHOW || action===EDIT || action===CREATE)} onClick={handleModalClick}>
      <h5>{action===SHOW?'Modal Detalles':'Editar'}</h5>
      <Formulario/>
    </div>
  )
}

export default DetallesModal