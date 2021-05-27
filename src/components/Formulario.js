import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({setFormulario}) => {

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar EEUU' },
        { codigo: 'COP', nombre: 'Peso Colombiano' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Exterlina' },
    ]

    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda', '', MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige  tu criptomoneda', '', listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const result = await Axios.get(url);
            setListaCripto(result.data.Data);
        }

        consultarAPI();
    }, []);

    const cotizarMoneda = (e) => {
        e.preventDefault();

        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            setError(true);
            return;
        }

        setError(false);
        setFormulario({
            moneda,
            criptomoneda
        })

    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje='Hay un error'/> : null}
            <SelectMoneda />
            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;