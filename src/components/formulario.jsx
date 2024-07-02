import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext, useEffect, useRef, useState } from "react"
import './formulario.css';
import { formContext } from "../contextos/context";
import { CREATE, EDIT, LOCAL_API, MENSAJE_TIMEOUT, SHOW } from "../utils/constantes";
import axios from "axios";


function Formulario() {
  const {cita, action, setReload, setCita} = useContext(formContext);
  console.log('CITA DESDE FORMULARIO CONTEXT', cita);
  const [enviado, setEnviado] = useState(false);
  
  const handleSubmit = (values) => {
    const {_, ...restValues} = values;
    console.log('VALORES',values)
    if(action===EDIT) axios.patch(`${LOCAL_API}/citas/${cita.id}`, restValues)
                      .then(ans => {console.log(ans); setReload(p=>!p);})
                      .then(()=>{
                        setEnviado(true);
                        setTimeout(() => {
                          setEnviado(false); setCita({});
                        }, MENSAJE_TIMEOUT);
                      })
                      .catch(err => console.error(err))
    if(action===CREATE){
      console.log('CREAR', values);
      axios.post(`${LOCAL_API}/citas`, values)
        .then(ans => {console.log(ans); setReload(p=>!p);})
        .then(()=>{
          setEnviado(true);
          setTimeout(() => {
            setEnviado(false); setCita({});
          }, MENSAJE_TIMEOUT);
        })
        .catch(err => console.error(err))
    }
  }
  const handleValidar = (values)=>{
    const errors = {};
    if(!values.nombreCliente){
      errors.nombreCliente = 'El nombre de cliente es requerido';
    }
    if(!values.fecha) errors.fecha = 'La fecha es requerida';
    if(!values.hora) errors.hora = 'La hora es requerida';
    if(!values.Descripcion) errors.Descripcion = 'La Descripción es requerida';
    return errors;
  } 
  return (
    <div className="form_container">
      <Formik initialValues={
        (action===EDIT||action===SHOW)?{...cita}:{Descripcion: "", fecha: "", hora: "", nombreCliente: ""}
        } 
        onSubmit={handleSubmit} 
        validate={handleValidar}
        enableReinitialize>
        <Form onClick={e => e.stopPropagation()}>
          <div className="nombre">
            <label htmlFor="">Nombre de Cliente</label>
            <Field placeholder='Nombre de Cliente' name='nombreCliente' disabled={action===SHOW}/>
            <div className="error_message">
              <ErrorMessage name="nombreCliente"/>
            </div>
          </div>
          <div className="fecha">
            <label htmlFor="">Fecha</label>
            <Field placeholder='Fecha' name='fecha' type='date' disabled={action===SHOW}/>
            <div className="error_message">
              <ErrorMessage name="fecha"/>
            </div>
          </div>
          <div className="hora">
            <label htmlFor="">Hora</label>
            <Field placeholder='Hora' name='hora' type='time' disabled={action===SHOW}/>
            <div className="error_message">
              <ErrorMessage name="hora"/>
            </div>
          </div>
          <div className="descripcion">
            <label htmlFor="">Descripción</label>
            <Field placeholder='Descripción' name='Descripcion' disabled={action===SHOW}/>
            <div className="error_message">
              <ErrorMessage name="Descripcion"/>
            </div>
          </div>
          {enviado&& 
          <p>
            {action===EDIT?'Editado correctamente':'Creado Correctamente'}
          </p>
          }
          <Field type='submit' value='Enviar' disabled={action===SHOW}/>
        </Form>

      </Formik>
    </div>
  )
}

export default Formulario