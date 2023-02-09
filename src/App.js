import { Component } from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import MyNavbar from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import MovieList from "./components/MovieList";

class App extends Component {
  state = {
    gallery1: [],
    gallery2: [],
    gallery3: [],
    gallery4: [],
    searchResults: [],
    loading: true,
    error: false,
  };

  url = "http://www.omdbapi.com/?i=tt3896198&apikey=988cf4d5";
  currUrl = document.URL;
  componentDidMount = () => {
    this.fetchMovies();
  };

  fetchMovies = async () => {
  try {
    const [response1, response2, response3, response4] = await Promise.all([
      fetch(this.url + "&s=star&20wars"),
      fetch(this.url + "&s=harry"),
      fetch(this.url + "&s=lord%20of%20the%20rings"),
      fetch(this.url + "&s=spider-man"),
    ]);

    if (response1.ok && response2.ok && response3.ok && response4.ok) {
      const [data1, data2, data3, data4] = await Promise.all([
        response1.json(),
        response2.json(),
        response3.json(),
        response4.json(),
      ]);
      if (data1.Response === "True" && data2.Response === "True" && data3.Response === "True" && data4.Response === "True") {
        this.setState({
          gallery1: data1.Search,
          gallery2: data2.Search,
          gallery3: data3.Search,
          gallery4: data4.Search,
          error: false,
        });
      } else {
        this.setState({ error: true });
      }
    } else {
      this.setState({ error: true });
    }
  } catch (err) {
    this.setState({ error: true });
    console.log("An error has occurred:", err);
  } finally {
    this.setState({ loading: false });
  }
};


  showSearchResult = async (searchString) => {
    if (searchString === "") {
      this.setState({ error: false, searchResults: [] }, () => {
        this.fetchMovies();
      });
    } else {
      try {
        const response = await fetch(this.url + "&s=" + searchString);
        if (response.ok) {
          const data = await response.json();
          if (data.Response === "True") {
            this.setState({ searchResults: data.Search, error: false });
          } else {
            this.setState({ error: true });
          }
        } else {
          this.setState({ error: true });
          console.log("an error occurred");
        }
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div><Router>
        <MyNavbar showSearchResult={this.showSearchResult} />
      </Router>
          <Container fluid className="px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">Movies</h2>
              <div className="ml-4 mt-1">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ backgroundColor: "#221f1f" }}
                    id="dropdownMenuButton"
                    className="btn-secondary btn-sm dropdown-toggle rounded-0"
                  >
                    Genres
                  </Dropdown.Toggle>
                  <Dropdown.Menu bg="dark">
                    <Dropdown.Item href="#">History</Dropdown.Item>
                    <Dropdown.Item href="#">Biography</Dropdown.Item>
                    <Dropdown.Item href="#">Crime</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div>
              <i className="fa fa-th-large icons"></i>
              <i className="fa fa-th icons"></i>
            </div>
          </div>
          {this.state.error && (
            <Alert variant="danger" className="text-center">
              An error has occurred, please try again!
            </Alert>
          )}
          {this.state.searchResults?.length > 0 && (
            <MovieList
              title="Search results"
              movies={this.state.searchResults}
            />
          )}
          {!this.state.error && !this.state.searchResults?.length > 0 && (
            <>
              <MovieList
                title="Star Wars"
                loading={this.state.loading}
                movies={this.state.gallery1.slice(0, 8)}
              />
              <MovieList
                title="Harry Potter"
                loading={this.state.loading}
                movies={this.state.gallery2.slice(0, 8)}
              />
              <MovieList
                title="Lord of the Rings"
                loading={this.state.loading}
                movies={this.state.gallery3.slice(0, 5)}
              />
              <MovieList
                title="Spider-Man"
                loading={this.state.loading}
                movies={this.state.gallery4.slice(0, 8)}
              />
            </>
          )}
          <MyFooter />
        </Container>
        
      </div>
    );
  }
}

export default App;
