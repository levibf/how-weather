import styled from "styled-components"
import { useState, useEffect } from 'react';
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    border: 1px solid white;
    border-radius: 4px;
`;

const Input = styled.input`
    
`;

function DisplayComponent({ value, temperature }) {
    return (
        <div>
            {temperature !== null && <p>Temperatura: {temperature}°C</p>}
        </div>
    );
}

export default function Card() {
    const [inputValue, setInputValue] = useState('');
    const [temperature, setTemperature] = useState(null);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue) {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=045fc69dd3d748eab17190100240308&lang=pt&q=${inputValue}`);
                setTemperature(response.data.current.temp_c);
            } catch (error) {
                console.error("Error fetching the weather data", error);
            }
        }
    };

    return (
        <Wrapper>
            Teste
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="busca"
                    id="busca"
                    placeholder="Digite sua cidade"
                    value={inputValue}
                    onChange={handleInput}
                    autoComplete="off"
                />
                <button type="submit">Buscar</button>
            </form>

            <DisplayComponent value={inputValue} temperature={temperature} />
        </Wrapper>
    );
}