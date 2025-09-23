import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Component from './Component'
import OtherComponent from './OtherComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Component/>
   <OtherComponent/>
    </>
  )
}

export default App
 function calcularHoras(){
  console.log("hola me llamo debbie");
 }