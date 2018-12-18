import React, { Component } from "react";

class CitySearch extends Component {
  state = {};
  componentDidUpdate() {
    this.setSearchFieldClass();
  }

  render() {
    return (
      <form>
        <input
          className={this.props.setSearchFieldClass}
          placeholder="Search for city"
          id="citySearch"
          onKeyPress={this.props.submitHandler}
        />
        <input
          className="btn btn-secondary"
          type="button"
          value="Search"
          onClick={this.props.handleClick}
        />
      </form>
    );
  }

  setSearchFieldClass() {
    let classes = this.props.coughtError
      ? "form-control is-invalid"
      : "form-control";
    return classes;
  }
}

export default CitySearch;
