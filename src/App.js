import './App.scss';
import axios from "axios";
import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherAppImage from './components/weatherImage';

function App() {
  const [ location, setLocation ] = useState("")
  const [ weatherData, setWeatherData ] = useState({})
  const [ moreInfo, setMoreInfo ] = useState(false)

  const { weather, main, name, sys, wind, timezone } = weatherData;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=sp&units=metric&appid=85f6c2fff7a0367d175ba92897e70b9b`;

  const searchInput = useRef();

  const toastify = () => {
    toast.error(`${location} no se pudo encontrar`,{
      icon: () => <img style={{width: 36}} src='/img/error.png' alt='Error'/>,
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      autoClose: 2500,
    })
  }

  const searchLocation = ( event ) => {
    if ( event.key === "Enter" ){
      axios.get(url).then(( resp ) =>{
        setWeatherData(resp.data)
        console.log(resp.data.name, resp.data)
      })
      .catch((err) =>{
        toastify();
      })
      setLocation("")
      searchInput.current.blur();
    }
  }
  
  const timeConverter = (UNIX) => {
    let a = new Date(UNIX * 1000)
    let hour = a.getHours(), min = a.getMinutes(), sec = a.getSeconds()
    if (hour < 10){
      hour = '0' + String(hour);
    }
    if (min < 10){
      min = '0' + String(min);
    }
    if (sec < 10){
      sec = '0' + String(sec);
    }
    let time = hour + ':' + min + ':' + sec
    return time;
  }

  const timeZone = (time) =>{
    let min = '00';
    let utc = time/3600;
    if(utc === 0){
      return '00:00'
    }
    if(utc % 1 !== 0){
      min = String((utc % 1)*60);
      utc = Math.floor(utc)
    }
    if (utc < 10 && utc > 0){
      utc = '0' + String(utc) + ':' +min;
      return utc;
    } else if (utc > -10 && utc < 0){
      let string = String(utc)
      let arr = string.split('')
      utc = arr[0] + '0' + arr[1];
      return utc;
    } else if (utc > 10){
      return utc + ':' +min
    }
  }

  const windDirection = (degrees) =>{
    if(degrees>337.5) return 'N';
    if(degrees>292.5) return 'NO';
    if(degrees>247.5) return 'O';
    if(degrees>202.5) return 'SO';
    if(degrees>157.5) return 'S';
    if(degrees>122.5) return 'SE';
    if(degrees>67.5) return 'E';
    if(degrees>22.5) return 'NE';
    return 'N';
  }

  return (
    <div className="App">
      <article className="WeatherApp">
        <header>
          <input value={ location }
          onChange={ event => setLocation(event.target.value) }
          onKeyPress={ searchLocation }
          placeholder="Ingrese una ciudad"
          type="text"
          ref={searchInput}
          />
        </header>
        <main>
          {!weather &&  
          <section className='default'>
            <h1>Weather App</h1>
            <p>Desarrollada por <a href='https://www.linkedin.com/in/benjaminzapata/' target='_blank' rel="noreferrer">Benjamin Zapata</a></p>
            <p>API by <a href="https://openweathermap.org" target='_blank' rel="noreferrer">OpenWeather</a></p>
            <ol>
              <li>1. Escriba una ubicacion en el buscador</li>
              <li>2. Presione ENTER</li>
              <li>3. La información aparecera en pantalla</li>
            </ol>
          </section>}
          {weather && <WeatherAppImage main={weather[0].main}/>}
          {main && <h2 className='temperature'>{main.temp.toFixed(1)}°C</h2>}
          {weather && <h2 className='description'>{weather[0].description}</h2>}
          {name &&  
          <div className='location'>
            <img src="/img/location.png" alt='Ubicación'/>
            <h2>{name},</h2>
            <h2>{sys.country}</h2>
          </div>}
        </main>
        <footer>
          {main &&  
          <div>
            <aside>
              <img src="/img/thermometer.png" alt='Sensación termica'/>
            </aside>
            <section>
              <h2>{main.feels_like.toFixed(1)}°C</h2>
              <p>Sensación termica</p>
            </section>
          </div>}
          {main &&  
          <div className='humidity'>
            <aside>
              <img src="/img/humidity.png" alt='Humedad'/>
            </aside>
            <section>
              <h2>{main.humidity}%</h2>
              <p>Humedad</p>
            </section>
          </div>
          }
        </footer>
      </article>
      {moreInfo && 
      <aside id='moreInfoDisplay'>
        <div>
          <img src='/img/sunrise.png' alt='Salida del Sol'/>
          <p>Salida del Sol {timeConverter(sys.sunrise)}</p>
        </div>
        <div>
          <img src='/img/sunset.png' alt='Puesta del Sol'/>
          <p>Puesta del Sol {timeConverter(sys.sunset)}</p>
        </div>
        <div>
          <img src='/img/wind.png' alt='Velocidad del viento'/>
          <p className='wind'>{wind.speed} m/s, {windDirection(wind.deg)}</p>
        </div>
        <div>
          <img src='/img/time.png' alt='Zona horario'/>
          <p>UTC {timeZone(timezone)}</p>
        </div>
      </aside>}
      {weather && <button className='moreInfoButton' onClick={() => setMoreInfo(!moreInfo)}>{moreInfo ? 'Mostrar menos' : 'Mostrar mas'}</button>}
      <ToastContainer />
    </div>
  );
}

export default App;