import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { FaSearch } from "react-icons/fa";

import { FaRegSnowflake } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { MdNightlightRound } from "react-icons/md";

const Weather = () => {

    const style = {
        width: "30px",
        height: "30px",
        // background: "#ebfffc",
        borderRadius: "50%",
        cursor: "pointer",
        color: "#fff",
    }

    const inputRef = useRef();
    const countryRef = useRef();
   
    // store data coming from the API 
    const [weatherData, setWeatherData] = useState(false);

    const [sun, setSun] = useState(false);

    const [timezoneOffset, setTimezoneOffset] = useState(0);

    const search = async (city, country) => {

        if (city === "") {
            alert("Enter city name");
            return;
        }

        try {
           
            const apiKey = import.meta.env.VITE_APP_ID;
            console.log(apiKey);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);

            
           

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                latitude: data.coord.lat,
                longitude: data.coord.lon,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
                weather: data.weather[0].main,
                country : data.sys.country,
               
                
            })
            setTimezoneOffset(data.timezone); // Set the timezone offset
           
        }
        catch (error) {
            console.log(error);
            setWeatherData(false);
        }
    };

    
    // call the search function whenever the component get loaded.
    useEffect(() => {
        search("London", "GB");
    }, []);

  // Function to search weather data by geographic coordinates
    const searchByCoordinates = async (latitude, longitude) => {
        try {
            const apiKey = import.meta.env.VITE_APP_ID;
            console.log(apiKey);
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                latitude: data.coord.lat,
                longitude: data.coord.lon,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon
            });

            setTimezoneOffset(data.timezone); // Set the timezone offset
        } catch (error) {
            console.log(error);
            setWeatherData(false);
        }
    };

    // Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                searchByCoordinates(latitude, longitude);
            }, (error) => {
                console.error(error);
                alert("Unable to retrieve your location");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Call the search function whenever the component gets loaded
    useEffect(() => {
        search("London", "GB");
    }, []);

    // Fetch sunrise and sunset times whenever weatherData is updated
    useEffect(() => {
        if (weatherData) {
            const fetchSunTimes = async () => {
                try {
                    const url2 = `https://api.sunrise-sunset.org/json?lat=${weatherData.latitude}&lng=${weatherData.longitude}&formatted=0`;
                    const response2 = await fetch(url2);
                    const data2 = await response2.json();

                    setSun({
                        sunrise: new Date(data2.results.sunrise).getTime() / 1000,
                        sunset: new Date(data2.results.sunset).getTime() / 1000,
                    });

                    console.log(`Sunrise: ${data2.results.sunrise}, Sunset: ${data2.results.sunset}`);
                } catch (error) {
                    console.log(error);
                    setSun(null);
                }
            };

            fetchSunTimes();
        }
    }, [weatherData]);


    // Function to format time with timezone offset
    const formatTime = (timestamp, offset) => {
        if(!timestamp) return 'Invalid time';
        const date = new Date((timestamp + offset) * 1000); // Convert Unix timestamp to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Format hours and minutes
    };


    return (
              
      <div className="weather">
          <div className="search-bar">
              <input ref={inputRef} type="text" placeholder="Search..." />
                <img src="" alt="" />
                 <input ref={countryRef} type="text" placeholder="Country Code (e.g., GB)" />
           
                <FaSearch style={style} onClick={()=> search(inputRef.current.value, countryRef.current.value)} />
               <button className="location-button"  onClick={getLocation}>Use My Location</button>
              
            </div>
            
            {weatherData ? <>  


            {/* < WiDaySunny className="weather-icon" /> */}
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" className="weather-icon" />
            <p className="location">{ weatherData.weather}</p>
            <p className="temperature">{ weatherData.temperature}°C</p>
                <p className="location">{weatherData.location}, {weatherData.country}</p>
          

          <div className="weather-data">
              <div className="col">
                  <WiHumidity className="weather-img"/>
                  <span>Humidity</span>
                  <div className = " ">
                        
                        <p>{ weatherData.humidity}%</p>
                     
                  </div>

              </div>


            <div className="col">
                <FaWind  className="weather-img"/>
                   <span>Wind</span> 
                <div>
                    <p>{ weatherData.windSpeed} km/hr</p>
                   
                </div>

            </div>
                    

                           
                
            <div className="col">
                            
                <WiDaySunny  className="weather-img"/>
                  <span>Sunrise</span> 
                <div>
                    <p>{formatTime(sun.sunrise, timezoneOffset)} AM </p>
                    
                </div>

            </div>

            <div className="col">
                < MdNightlightRound className="weather-img"/>
                    <span>Sunset</span> 
                <div>
                    <p>{formatTime(sun.sunset, timezoneOffset)} PM </p>
                  
                </div>

            </div>
                        
            
        </div>

        </> : <></>}

          
    </div>
  )
}

export default Weather