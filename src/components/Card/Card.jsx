import styled from "styled-components"
import { useState, useEffect } from 'react';
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    border-radius: 1em;
    padding: 25px;
    background-color: #546bed;
`;

const Input = styled.input`
    height: 35px;
    border-radius: 4px;
    background-color: white;
    color: black;
`;

const DisplayComponent = styled.div`
`;

const WrapperCondition = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
`

const WrapperWindHumidity = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    #wind {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid white;
        margin: 0.6rem;
        padding-left: 0.6rem;
    }
`

export default function Card() {
    const [inputValue, setInputValue] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [condition, setCondition] = useState(null);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue) {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=045fc69dd3d748eab17190100240308&lang=pt&q=${inputValue}`);
                setTemperature(response.data.current.temp_c);
                setCondition(response.data.current);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        }
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Input
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

            <DisplayComponent>
                {/* <CiLocationOn /> */}
                <h3>{inputValue}</h3>
                {temperature !== null && <p>Temp: {temperature}°C</p>}

                {condition && (
                    <WrapperCondition>
                        <p>Condição: {condition.condition.text}</p>
                        <img src={condition.condition.icon} alt="icone tempo" width={45} />
                    </WrapperCondition>
                )}

                {condition && (
                    <WrapperWindHumidity>
                        <WiHumidity size={30} />
                        <p> {condition.humidity}%</p>
                        <div id="wind">
                            <FaWind />
                            <p>{condition.wind_kph} Km/h</p>
                        </div>
                    </WrapperWindHumidity>
                )}

            </DisplayComponent>
        </Wrapper>
    );
}