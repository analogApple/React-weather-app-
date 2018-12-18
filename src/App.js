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
    },
    cityToUrl: "0",
    coughtError: false
  };

  constructor(props) {
    super(props);
    const state = this.state;
    state.weather.updateTime = this.formatDate();
    state.cityToUrl = "Vilnius";
  }

  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData() {
    let city = this.state.cityToUrl;
    $.ajax({
      url:
        "https://weather.api.here.com/weather/1.0/report.json?app_id=AAAAAAAAAAAAAAAAA&app_code=AAAAAAAAAAAAAAAAAAAAAAAAAAAAA&product=observation&name=" +
        city +
        "&oneobservation=true",
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsonpcallback",
      success: function(data) {
        this.setWeatherState(data);
      }.bind(this),
      error: function() {
        this.handleError();
      }.bind(this)
    });
  }

  handleError() {
    let state = this.state;
    state.coughtError = true;
    this.setState({ state });
    this.setSearchFieldClass();
  }

  setWeatherState = data => {
    if (data.Type === "Invalid Request") {
      this.handleError();
    } else {
      const {
        temperature,
        skyDescription,
        iconLink,
        country,
        city
      } = data.observations.location[0].observation[0];

      const state = this.state;
      state.weather.temperature = parseInt(temperature);
      state.weather.description = skyDescription;
      state.weather.city = city;
      state.weather.country = country;
      state.weather.iconLink = iconLink;

      state.coughtError = false;

      state.searchFieldValue = "Type in city and press Search";

      this.setState(state);
    }
  };

  formatDate = () => {
    let date = new Date();
    let formatedDate =
      "Updated: " +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      this.getMinutes();
    return formatedDate;
  };

  getMinutes() {
    let date = new Date();
    let mins = date.getMinutes();

    let minutes = mins / 10 < 1 ? "0" + mins : mins;
    return minutes;
  }
  handleClick = () => {
    let state = this.state;
    let city = document.getElementById("citySearch").value;
    state.cityToUrl = city;
    this.setState(state);

    this.getWeatherData();
  };

  submitHandler = e => {
    if (e.which === 13) {
      e.preventDefault();
      this.handleClick();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="border-box">
              <div className="city-name">
                {this.state.weather.city}, {this.state.weather.country}{" "}
              </div>
              <div className="warther-icon">
                <img
                  src={this.state.weather.iconLink}
                  alt={this.state.weather.description}
                />
              </div>
              <div className="temperature">
                {this.state.weather.temperature} C°,{" "}
                {this.state.weather.description}
              </div>
              <div>{this.state.weather.updateTime}</div>
              <form className="row">
                <input
                  className={this.setSearchFieldClass()}
                  placeholder="Search for city"
                  id="citySearch"
                  onKeyPress={this.submitHandler}
                />
                <button
                  className="btn btn-sm col-sm-3"
                  type="button"
                  onClick={this.handleClick}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setSearchFieldClass() {
    let classes = this.state.coughtError
      ? "form-control-sm is-invalid col-sm-6"
      : "form-control-sm col-sm-6";
    return classes;
  }
}

export default App;
