import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar } from 'recharts';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://open-meteo.com/api/v1/forecast?latitude=52.52&longitude=13.41');
        const data = await response.json();

        // Asumiendo que la respuesta tiene la estructura esperada
        setWeatherData(data);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="weather-column" id="weather-column">
        <h2 className="weather-title">Servicio de Meteorología</h2>

        {/* Termómetro y Escala de Temperatura */}
        <div className="thermometer-container">
          {/* Resto del contenido del termómetro */}
        </div>

        {/* Punto de Temperatura */}
        <div className="temperature-point">
          <p>Temperatura: {weatherData?.temperature}°C</p>
        </div>

        {/* Punto de Humedad */}
        <div className="humidity-point">
          <p>Humedad: {weatherData?.humidity}%</p>
        </div>

        {/* Gráfico de Barras */}
        <div id="temperature-chart">
          <BarChart width={300} height={150} data={[{ temperature: weatherData?.temperature }]} margin={{ left: 20 }}>
            <Bar dataKey="temperature" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Reloj de Presión de Aire */}
        <div className="measurement-container" id="pressure-container">
          <div className="label">Presión</div>
          <div className="measurement-value" id="pressure-value">
            {weatherData?.pressure} hPa
          </div>
        </div>

        {/* Brujula de Dirección del Aire */}
        <div className="measurement-container" id="wind-direction-container">
          <div className="label">Dirección del Viento</div>
          <div className="measurement-value" id="wind-direction-value">
            {weatherData?.windDirection}
          </div>
        </div>
      </div>

      {/* Sección del Horario de Transporte */}
      <div className="transport-column" id="transport-column">
        <h2 className="transport-title">Servicio de Transporte</h2>
        
        {/* Horario de Autobuses */}
        <div className="bus-schedule">
          <p>Autobuses: 10:00 AM - 6:00 PM</p>
        </div>

        {/* Horario de Trenes */}
        <div className="train-schedule">
          <p>Trenes: 8:00 AM - 9:00 PM</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
