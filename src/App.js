import './App.scss';
import axios from "axios";
import { useState } from "react";
import WeatherAppImage from './components/weatherImage';

function App() {
  const [ location, setLocation ] = useState("")
  const [ weatherData, setWeatherData ] = useState({})

  const { weather, main, name, sys } = weatherData;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=sp&units=metric&appid=85f6c2fff7a0367d175ba92897e70b9b`;

  const searchLocation = ( event ) => {
    if ( event.key === "Enter" ){
      axios.get(url).then(( resp ) =>{
        setWeatherData(resp.data)
        console.log(resp.data)
      })
      setLocation("")
    }
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
          />
        </header>
        <main>
          {!weather &&  <section className='default'>
                          <h1>Weather App</h1>
                          <p>Desarrollada por Benjamin Zapata</p>
                          <p>API by <a href="https://openweathermap.org">OpenWeather</a></p>
                          <ol>
                            <li>1. Escriba una ubicacion en el buscador</li>
                            <li>2. Presione ENTER</li>
                            <li>3. La información aparecera en pantalla</li>
                          </ol>
                        </section>}
          {weather && <WeatherAppImage main={weather[0].main}/>}
          {main && <h2 className='temperature'>{main.temp.toFixed(1)}°C</h2>}
          {weather && <h2 className='description'>{weather[0].description}</h2>}
          {name &&  <div className='location'>
                      <img src="/img/location.png"/>
                      <h2>{name},</h2>
                      <h2>{sys.country}</h2>
                    </div>}
        </main>
        <footer>
          {main &&  <div>
                      <aside>
                        <img src="/img/thermometer.png"/>
                      </aside>
                      <section>
                        <h2>{main.feels_like.toFixed(1)}°C</h2>
                        <p>Sensación termica</p>
                      </section>
                    </div>}
          {main &&  <div className='humidity'>
                      <aside>
                        <img src="/img/humidity.png"/>
                      </aside>
                      <section>
                        <h2>{main.humidity}%</h2>
                        <p>Humedad</p>
                      </section>
                    </div>
          }
        </footer>
      </article>
    </div>
  );
}

export default App;