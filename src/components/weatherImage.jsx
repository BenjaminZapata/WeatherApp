import { useState, useEffect } from "react";
import weatherList from "../utils/weatherList";

const WeatherAppImage = ({ main }) => {
    const [ weatherImage, setWeatherImage ] = useState('')

    const searchImage = () => {
        const item = weatherList.find( el => el.main === main );
        if (item){
            setWeatherImage(item.img)
        }
        else{
            setWeatherImage('img/unavaiable.png')
        }
    }

    useEffect( () =>{
        searchImage()
    })
    
    return (
        <>
        <img className="weather__image" src={weatherImage} alt="Weather Image"/>
        </>
    )
}

export default WeatherAppImage;