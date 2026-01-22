import { useEffect, useState } from 'react';
import styles from './Prognose.module.scss';

// Interface for daglige vejrdata
interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

// Komponent til at vise 3-dages vejrprognose
function Prognose() {
  const [forecast, setForecast] = useState<DailyWeather | null>(null);
  const [loading, setLoading] = useState(true);

  // Funktion til at konvertere vejrcode til beskrivelse
  function getWeatherDescription(code: number): string {
  
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


  // Henter prognosedata fra API ved komponentens første render
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=57.2089&longitude=10.1554&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Copenhagen`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecast(data.daily);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Viser loading besked mens data hentes
  if (loading) return <p>Indlæser prognose...</p>;
  // Viser fejl besked hvis data ikke kunne hentes
  if (!forecast) return <p>Kunne ikke hente prognose</p>;

  // Renderer prognosedata
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>3-dages Vejrprognose i Klokkerholm</h2>
      {/* Mapper over de første 3 dage og viser vejrdata for hver dag */}
      {forecast.time.slice(0, 3).map((day, index) => (
        <div key={day} className={styles.forecastItem}>
          <div className={styles.day}>{day}</div>
          <p>Max:{forecast.temperature_2m_max[index]}C</p>
          <p>Min:{forecast.temperature_2m_min[index]}C</p>
          <p>Vejr:{getWeatherDescription(forecast.weathercode[index])}</p>

        </div>
      ))}
    </div>
  );
}

export default Prognose;

