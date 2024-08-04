import styled from "styled-components"
import { useState, useEffect } from 'react';
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    border-radius: 1em;
    padding: 2em;
    background-color: rgba(84, 107, 237, 0.5);
    box-shadow: 0px 0px 8px 0px #2B2B2B;
`;

const Input = styled.input`
    height: 35px;
    border-radius: 1em;
    background-color: white;
    color: black;
    border: none;
`;

const Location = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

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
    padding-left: 20px;
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
    const [location, setLocation] = useState(null);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue) {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=045fc69dd3d748eab17190100240308&lang=pt&q=${inputValue}`);
                setTemperature(response.data.current.temp_c);
                setCondition(response.data.current);
                setLocation(response.data.location.name)
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
                {condition && (
                    <Location>
                        <FaLocationDot size={40} />
                        <h3>{location}</h3>
                    </Location>
                )}
                {temperature !== null && <h1>{temperature} °C</h1>}

                {condition && (
                    <WrapperCondition>
                        <p>Clima: {condition.condition.text}</p>
                        <img src={condition.condition.icon} alt="icone tempo" width={45} />
                    </WrapperCondition>
                )}

                {condition && (
                    <WrapperWindHumidity>
                        <WiHumidity size={30} />
                        <p> {condition.humidity}%</p>
                        <div id="wind">
                            <p><FaWind /> {condition.wind_kph} Km/h</p>
                        </div>
                    </WrapperWindHumidity>
                )}

            </DisplayComponent>
        </Wrapper>
    );
}