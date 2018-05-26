import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import debounce from "debounce";

const token = "0e695ea56308d7d41dd017762f243876";

const Movie = ({ title, overview, score }) => (
  <div>
    <p className="lead">
      {title} <small>(score: {score})</small>
    </p>
    <p>{overview}</p>
  </div>
);

class App extends Component {
  state = { search: "", results: [] };

  handleChange = event => {
    this.setState({ search: event.target.value });
    this.debouncedSearch(event.target.value);
  };

  search = query =>
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&api_key=${token}&language=en-US&page=1&include_adult=false`
      )
      .then(res => {
        this.setState({ results: res.data.results });
      });
  debouncedSearch = debounce(this.search, 600);

  displayResults = () => {
    const { results } = this.state;
    return (
      <ul className="col-12 list-unstyled">
        {results.map(({ title, overview, vote_average }) => (
          <li>
            <Movie title={title} overview={overview} score={vote_average} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col-12">
            <div className="form-group mt-2">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Search a movie"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
        <div className="row">{this.displayResults()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
