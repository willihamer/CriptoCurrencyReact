import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {

    const [formulario, setFormulario] = useState({});
    const [cotizacion, setCotizacion] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const cotizarCripto = async () => {

            if (Object.keys(formulario).length === 0) return;

            setCargando(true);
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${formulario.criptomoneda}&tsyms=${formulario.moneda}`;
            const resultado = await Axios.get(url);

            setTimeout(() => {
                setCargando(false);
                setCotizacion(resultado.data.DISPLAY[formulario.criptomoneda][formulario.moneda]);
            }, 3000)

        }

        cotizarCripto();

    }, [formulario])

    return (
        <Contenedor>
            <div>
                <Imagen src={imagen} alt="imagen Cryto" />
            </div>
            <div>
                <Heading>COTIZA CRIPTOMONEDAS AL INSTANTE</Heading>
                <Formulario
                    setFormulario={setFormulario}
                />
                {cargando ? <Spinner /> : <Cotizacion cotizacion={cotizacion} />}
            </div>
        </Contenedor>
    );
}

export default App;
