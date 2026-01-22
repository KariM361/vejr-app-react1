import { useEffect, useState } from 'react';
import styles from './Hovedside.module.scss';

// Interface for vejrdata
interface CurrentWeather {
  time: string[]
  temperature: number;
  windspeed: number;
  weathercode: number;
}

// Komponent til at vise aktuelle vejrforhold
function Hovedside() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
   function getWeatherDescription1(code: number): string {
  
    switch (code) {
    case 0: return "Klar himmel";
    case 1: return "Mest klart";
    case 2: return "Let skyet";
    case 3: return "Overskyet";
    case 45: return "Tåge";
    case 48: return "Tåge med rim";
    case 51: return "Let regn";
    case 53: return "Moderat regn";
    case 55: return "Kraftig regn";
    case 61: return "Let regn";
    case 63: return "Moderat regn";
    case 65: return "Kraftig regn";
    case 71: return "Let sne";
    case 73: return "Moderat sne";
    case 75: return "Kraftig sne";
    case 80: return "Let byge";
    case 81: return "Moderat byge";
    case 82: return "Kraftig byge";
    case 95: return "Tordenbyge";
    default: return "Ukendt vejr";
  }
}


  // Henter vejrdata fra API ved komponentens første render
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=57.2089&longitude=10.1554&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })//hvis der opstår en fejl under indlæsning kør denne funktion
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Viser loading besked mens data hentes
  if (loading) return <p>Indlæser vejr...</p>;
  // Viser fejl besked hvis data ikke kunne hentes
  if (!weather) return <p>Kunne ikke hente vejrdata</p>;

  // Renderer vejrdata
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Aktuelt Vejr i Klokkerholm</h2>
        <div className={styles.weatherInfo}>
        <p className={styles.weatherItem1}>Time: {weather.time}</p>
        <p className={styles.weatherItem}>Temperatur: {weather.temperature}°C</p>
        <p className={styles.weatherItem}>Vindhastighed: {weather.windspeed} km/t</p>
        <p className={styles.weatherItem}>Vejr: {getWeatherDescription1(weather.weathercode)}</p>
      </div>
    </div>
  );
}

export default Hovedside;
