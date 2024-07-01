import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Formulario from './components/formulario'
import ContextFormProvider from './contextos/context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContextFormProvider>
      <Formulario/>
    </ContextFormProvider>
    </>
  )
}

export default App
