import React, { useContext } from 'react'
import { useGetData } from '../hooks/getData'
import { CREATE, DELETE, EDIT, SHOW, T_NOMBRE, T_accion, T_descripcion, T_fecha, T_hora } from '../utils/constantes';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GiAllSeeingEye } from 'react-icons/gi';
import { formContext } from '../contextos/context';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiLoader2Fill } from 'react-icons/ri';
import { MagnifyingGlass } from 'react-loader-spinner';

function ListaCitas() {
  const [citas, error, loading] = useGetData('/citas');
  const { setAction, setCita } = useContext(formContext); 
  console.log('citas', citas);
  const handleShow = (cita)=>{
    setCita(cita);
    setAction(SHOW);
  }
  const handleEdit = (cita)=>{
    setAction(EDIT);
    setCita(cita);
  }
  const handleDelete = ()=>{
    setAction(DELETE);
    setCita();
  }
  const handleAddCita = () => setAction(CREATE);

  return (
    <>
      <div className="lista_citas">...
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
            <GiAllSeeingEye onClick={()=>handleShow(cita)}/>  
            <FaEdit onClick={()=>handleEdit(cita)}/> 
            <FaTrashAlt onClick={handleDelete}/>
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
        <IoIosAddCircleOutline onClick={handleAddCita}/>
      </div>
    </>
  )
}

export default ListaCitas