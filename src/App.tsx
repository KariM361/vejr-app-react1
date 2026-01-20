import { useEffect, useState } from 'react'
import style from './App.module.scss'
import './App.css'

function App() {
const vejrUrl =`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
const [vejrData, setVejrData] = useState(null)


useEffect(()=>{
  fetch(vejrUrl)
  .then((res)=> res.json())
  .then((data)=> setVejrData(data))
}, [])

console.log(vejrData)

  let content;
  if (vejrData) {
    content = (
      <div className={style.vejrStyle}>
        <h2>{vejrData.current.time}</h2>
        <p>Timezone: {vejrData.timezone}</p>
        <p>Temperature: {vejrData.current.temperature_2m}C</p>
        <p>Wind Speed: {vejrData.current.wind_speed_10m} km/h</p>
        <p>Latitude: {vejrData.latitude}</p>
        <p>Longitude:{vejrData.longitude}</p>
      </div>
    );
  } else {
    content = <p>Loading weather data...</p>;
  }

  return (
    <>
     <main>
      <section>
        {content}
      </section>
      </main> 
    </>
  )
}

export default App
