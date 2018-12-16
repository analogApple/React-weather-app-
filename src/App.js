import React, { Component } from "react";
import $ from "jquery";

class App extends Component {
  state = {
    weather: {
      temperature: "",
      description: "",
      iconLink: "",
      country: "",
      city: ""
    }
  };

  constructor(props) {
    super(props);
    const weather = this.state.weather;
    weather.updateTime = this.formatDate();
    this.state = { weather };
  }

  componentDidMount() {
    $.ajax({
      url:
        "https://weather.api.here.com/weather/1.0/report.json?app_id=AAAAAAAAA&app_code=AAAAAAAAA&product=observation&name=Kaunas&oneobservation=true",
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsonpcallback",
      success: function(data) {
        this.setWeatherState(data);
      }.bind(this)
    });
  }

  setWeatherState(data) {
    const {
      temperature,
      description,
      iconLink,
      country,
      city
    } = data.observations.location[0].observation[0];

    const weather = this.state.weather;
    weather.temperature = temperature;
    weather.description = description;
    weather.city = city;
    weather.country = country;
    weather.iconLink = iconLink;

    this.setState(weather);

    console.log(this.state);
  }

  formatDate() {
    let date = new Date();
    let formatedDate =
      "Updated: " +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return formatedDate;
  }

  render() {
    return (
      <div className="container">
        <div className="border-box">
          <div className="city-name">{this.state.weather.city}</div>
          <div className="warther-icon">
            <img
              src={this.state.weather.iconLink}
              alt={this.state.weather.description}
            />
          </div>
          <div className="temperature">
            {this.state.weather.temperature} C ,{" "}
            {this.state.weather.description}
          </div>
          <div>{this.state.weather.updateTime}</div>
          <form>
            <input type="text" name="cityname" placeholder="Iveskite miesta" />
            <input className="btn btn-secondary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
