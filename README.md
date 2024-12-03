This is a simple weather application built with React that allows users to search for weather information by city and country, or use their current location to get weather data. The application fetches weather data from the OpenWeatherMap API and displays it to the user.

## ✨ Features

- 🔍 Search for weather data by city and country code
- 📍 Use geolocation to get weather data for the user's current location
- 🌡️ Display weather information including temperature, humidity, wind speed, and weather conditions
- 🌅 Show sunrise and sunset times converted to local time

## 🛠️ Technologies Used

- ⚛️ React
- 🌐 OpenWeatherMap API
- 🌄 Sunrise-Sunset API
- 🎨 CSS for styling

## 🚀 Getting Started

### Prerequisites

- 🖥️ Node.js and npm installed on your machine
- 🔑 An API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. 📥 Clone the repository:

    ```sh
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2. 📦 Install the dependencies:

    ```sh
    npm install
    ```

3. 📝 Create a `.env` file in the root directory and add your OpenWeatherMap API key:

    ```env
    VITE_APP_ID=your_openweathermap_api_key
    ```

4. ▶️ Start the development server:

    ```sh
    npm run dev
    ```

5. 🌐 Open your browser and navigate to `http://localhost:3000` to see the application in action.

## 📚 Usage

1. 🌆 Enter a city name and country code (e.g., "London", "GB") in the search bar and click the search icon to get weather data for that location.
2. 📍 Alternatively, click the "Use My Location" button to get weather data for your current location using geolocation.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
