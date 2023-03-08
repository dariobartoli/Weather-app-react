import { useEffect, useState } from "react"
import { getCountries } from "./services/getCountries"
import { getCities } from "./services/getCities"
import { getCityWeather } from "./services/weather"
import './App.css'


function App() {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    (async()=>{
      const paises = await getCountries()
      const paisesAsc = paises.sort((a,b) => {
        if(a.name.common > b.name.common){
          return 1;
        }
        if(a.name.common < b.name.common){
          return -1;
        }
        return 0
      })
      setCountries(paisesAsc);
    })();
  }, []);


//si e.current.value está vacio que no haga nada sino que haga el await
  const countryHandler = async e => {
    if(e.currentTarget.value === ""){
      setWeather(null)
      setCities([])
    }else{
      const ciudades = await getCities(e.currentTarget.value)
      const ciudadesAsc = ciudades.sort((a,b) =>{
        if(a.name> b.name){
          return 1;
        }
        if(a.name< b.name){
          return -1;
        }
        return 0
      })
      setCities(ciudadesAsc)
      setWeather(null)
    }
  }
  

  const cityHandler = async e => {
  if(e.currentTarget.value === ""){
    setWeather(null)
  }else{
      setWeather(await getCityWeather(e.currentTarget.value))
    }
  }



  return (
    <>
    <header className="header">
      <h1>Weather Application</h1>
    </header>
    <div className="container__body">
      <div className="container__select">
          <label className="label">Choise country: </label>
          <select onChange={countryHandler} className="select">
            <option value="">choise</option>
            {countries.map(country => <option key={country.cca2} value={country.cca2}> {country.name.common}</option>)}
          </select>
        </div>

        {cities.length > 0 && (<div className="container__select">
          <label className="label">Choise city: </label>
          <select onChange={cityHandler} className="select">
            <option value="">choise</option>
            {cities.map(cities => <option key={cities.id}>{cities.name}</option>)}
          </select>
        </div>)}

        {weather && (
          <div className="info__weather">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather"/>
            <h2>Actual temperature: {weather.main.temp.toFixed()}º</h2>
            <p>Min: {weather.main.temp_min.toFixed()}º  ||  Max: {weather.main.temp_max.toFixed()}º</p>
            <p>Feels like: {weather.main.feels_like.toFixed()}º</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: to {weather.wind.speed} km/h</p>
          </div>
        )}
    </div>

    </>
  )
}

export default App
