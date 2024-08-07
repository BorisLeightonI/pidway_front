import React, { useContext, useEffect, useState } from 'react'
import { useGetData } from '../hooks/getData'
import { CREATE, DELETE, EDIT, SHOW, T_NOMBRE, T_accion, T_descripcion, T_fecha, T_hora } from '../utils/constantes';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GiAllSeeingEye } from 'react-icons/gi';
import { formContext } from '../contextos/context';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiLoader2Fill } from 'react-icons/ri';
import { MagnifyingGlass } from 'react-loader-spinner';
import { MdOutlineClear } from 'react-icons/md';
import './listaCitas.css';

function ListaCitas() {
  const [citasFromGet, error, loading] = useGetData('/citas');
  const [citas, setCitas] = useState(citasFromGet);
  const { setAction, setCita } = useContext(formContext); 
  console.log('citas', citas);
  useEffect(()=>{
    if(citasFromGet) setCitas(citasFromGet);
  },[citasFromGet])
  const handleShow = (cita)=>{
    setCita(cita);
    setAction(SHOW);
  }
  const handleEdit = (cita)=>{
    setAction(EDIT);
    setCita(cita);
  }
  const handleDelete = (cita)=>{
    setAction(DELETE);
    setCita(cita);
  }
  const handleAddCita = () => {
    setCita({});
    setAction(CREATE);
  }
  const handleFilterByDate = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    if(citas){
      setCitas(citasFromGet.filter(cita => cita.fecha===value));
    }
  }
  const handleClearFilter = ()=>setCitas(citasFromGet);

  return (
    <>
    <div className="clear_filter">
      <label htmlFor="">Filtrar por Fecha: </label>
      <input type="date" name="filtro" id="" onChange={handleFilterByDate}/>
      <MdOutlineClear onClick={handleClearFilter}/>
    </div>
      <h2>Listado de Citas</h2>
      <div className="lista_citas">
        <table>
          <thead>
            <tr>
              <th>{T_NOMBRE}</th>
              <th>{T_fecha}</th>
              <th>{T_hora}</th>
              <th>{T_descripcion}</th>
              <th>{T_accion}</th>
            </tr>
          </thead>

        {citas&&citas.map(cita => <tr key={cita.id}>
          <td>{cita.nombreCliente}</td>
          <td>{cita.fecha}</td>
          <td>{cita.hora}</td>
          <td>{cita.Descripcion}</td>
          <td>
            <GiAllSeeingEye size={'2em'} onClick={()=>handleShow(cita)}/>  
            <FaEdit size={'2em'} onClick={()=>handleEdit(cita)}/> 
            <FaTrashAlt size={'2em'} onClick={()=>handleDelete(cita)}/>
          </td>
        </tr>)

        }
        {loading&&
          <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
          />
        }
        </table>
        <IoIosAddCircleOutline size={'2em'} color='lightblue' onClick={handleAddCita}/>
      </div>
    </>
  )
}

export default ListaCitas