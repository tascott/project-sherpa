import React, { useContext, useState } from 'react';
import axios from 'axios';
import WeatherContext from './context';

function WeatherForm() {
  const { setWeatherData } = useContext(WeatherContext);
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: '<REQUIRED>' },
      headers: {
        'X-RapidAPI-Key': 'ea5f0cd589msh55ae6aac61ebb58p184b74jsn097403a586f5',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };
    options.params.q = location;

    try {
      const response = await axios.request(options);
      setWeatherData(response.data.current.temp_c);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default WeatherForm;