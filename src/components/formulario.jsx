import { Field, Form, Formik } from "formik"
import { useContext, useRef } from "react"
import './formulario.css';
import { formContext } from "../contextos/context";


function Formulario() {
  const {cita} = useContext(formContext);
  console.log('CITA DESDE CONTEXT', cita);
  const initialValuesRef = useRef({nombreCliente: "cliente1", fecha: "2024-06-28", hora: "13:57:25.123Z", descripcion: "descripción de cita."})
  return (
    <div className="form_container">
      <Formik initialValues={initialValuesRef.current} >
        <Form>
          <Field placeholder='Nombre de Cliente' name='nombreCliente'/>
          <Field placeholder='Fecha' name='fecha' type='date'/>
          <Field placeholder='Hora' name='hora' type='time'/>
          <Field placeholder='Descripción' name='descripcion' type="textarea"/>
        </Form>

      </Formik>
    </div>
  )
}

export default Formulario