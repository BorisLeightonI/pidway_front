import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Formulario from './components/formulario'
import ContextFormProvider from './contextos/context'
import ListaCitas from './components/listaCitas'
import DetallesModal from './components/detallesModal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContextFormProvider>
      <DetallesModal/>
      <ListaCitas/>
    </ContextFormProvider>
    </>
  )
}

export default App
