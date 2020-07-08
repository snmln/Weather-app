import React from 'react';
import './App.css';
import Weather from './app_components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './app_components/form.component'
//Api call api.openweathermap.org/data/2.5/weather?q=London,uk


const API_key = "9747f5aa0dc4ef37a97b710f92fe88f3"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      lat: undefined,
      long: undefined
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"

    }
  }

  calCelsius(temp) {
    let cell = Math.floor((temp - 273.15)*(9/5) +32)
    return cell;
  }

  get_Weathericon(icon, reangeID) {
    switch (true) {
      case reangeID >= 200 && reangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case reangeID >= 300 && reangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case reangeID >= 500 && reangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case reangeID >= 600 && reangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case reangeID >= 701 && reangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case reangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case reangeID >= 801 && reangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds })
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();
      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error:false,
        lat: response.coord.lat,
        long:response.coord.lon

      })
      this.get_Weathericon(this.weatherIcon, response.weather[0].id)
    }else{
      this.setState({error:true});
    }

  }

  state = {}
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          lat={this.state.lat}
          long={this.state.long}

        />
      </div>
    );
  }
}
export default App;


