"use client"
import { useState } from 'react';
export default function Index() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [forecastData, setForecastData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch data from the API
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      // Extract the first 30 timeseries objects
      const first30Timeseries = data.properties.timeseries.slice(0, 30);
      setForecastData(first30Timeseries);
    } else {
      // Handle error
      console.error('Failed to fetch data');
    }
  };
  return (
    <main>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            className="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />

          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            className="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />

          <button type="submit">Get Forecast</button>
        </form>

        {forecastData && (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((item) => (
                <tr key={item.time}>
                  <td>{new Date(item.time).toLocaleString()}</td>
                  <td>{item.data.instant.details.air_temperature.toFixed(1)}</td>
                  <td>{item.data.next_1_hours.summary.symbol_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}