import React, { useContext } from 'react'
import { formContext } from '../contextos/context'
import { CREATE, EDIT, SHOW } from '../utils/constantes';
import Formulario from './formulario';
import './detallesmodal.css'

function DetallesModal() {
  const {cita, action, setAction, setCita} = useContext(formContext);
  const handleModalClick = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    setCita();
    setAction(null);
  };
  return (
    <div className='modal_container' hidden={!(action===SHOW || action===EDIT || action===CREATE)} onClick={handleModalClick}>
      <h3>{action===SHOW?'Información de Cita':action===EDIT?'Editar Cita':'Crear Nueva Cita'}</h3>
      <Formulario/>
    </div>
  )
}

export default DetallesModal