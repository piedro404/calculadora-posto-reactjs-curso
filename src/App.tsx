import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

// Calcular Alcool/Gasolina
// E se o resultado for menor que 0,7 comprensa usar alcool

interface InfoProps{
  title: string
  alcool: string | number
  gasolina: string | number
}

function App() {
  const [alcoolInput, setAlcoolInput] = useState(1)
  const [gasolinaInput, setGasolinaInput] = useState(1)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault()

    let calculo = (alcoolInput/ gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar Álcool",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
    else{
      setInfo({
        title: "Compensa usar Gasolina",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado
  }

  return (
    <div>
      <main className='container'>
        <img
          className='logo'
          src={logoImg} 
          alt="Logo da calculadora de gasolina ou alcool" 
        />
        <h1 className='title'>Qual a Melhor Opção?</h1>
      
        <form className='form' onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input 
            className='input'
            type="number"
            placeholder='4,50'
            min="1"
            step="0.01"
            required 
            value={alcoolInput}
            onChange={ (e) => setAlcoolInput(Number(e.target.value)) }
          />

          <label>Gasolina (preço por litro):</label>
          <input 
            className='input'
            type="number"
            placeholder='4,50'
            min="1"
            step="0.01"
            required 
            value={gasolinaInput}
            onChange={ (e) => setGasolinaInput(Number(e.target.value)) }
          />

          <input className='button' type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
          <h2 className='result-title'>{info.title}</h2>

          <span>Álcool {info.alcool}</span>
          <span>Gasolina {info.gasolina}</span>
          </section>
        )}

      </main>
    </div>
  )
}

export default App
