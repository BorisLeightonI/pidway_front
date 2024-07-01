import { Field, Form, Formik } from "formik"
import { useContext, useEffect, useRef, useState } from "react"
import './formulario.css';
import { formContext } from "../contextos/context";
import { CREATE, EDIT, LOCAL_API, MENSAJE_TIMEOUT, SHOW } from "../utils/constantes";
import axios from "axios";


function Formulario() {
  const {cita, action, setReload} = useContext(formContext);
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
                          setEnviado(false);
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
            setEnviado(false);
          }, MENSAJE_TIMEOUT);
        })
        .catch(err => console.error(err))
    }
  }
  return (
    <div className="form_container">
      <Formik initialValues={{...cita}} onSubmit={handleSubmit} enableReinitialize>
        <Form onClick={e => e.stopPropagation()}>
          <div className="nombre">
            <label htmlFor="">Nombre de Cliente</label>
            <Field placeholder='Nombre de Cliente' name='nombreCliente' disabled={action===SHOW}/>
          </div>
          <div className="fecha">
            <label htmlFor="">Fecha</label>
            <Field placeholder='Fecha' name='fecha' type='date' disabled={action===SHOW}/>
          </div>
          <div className="hora">
            <label htmlFor="">Hora</label>
            <Field placeholder='Hora' name='hora' type='time' disabled={action===SHOW}/>
          </div>
          <Field placeholder='Descripción' name='Descripcion' as="textArea" disabled={action===SHOW}/>
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