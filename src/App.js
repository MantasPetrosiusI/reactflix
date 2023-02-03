import { Component } from "react";
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

  fetchMovies = () => {
    Promise.all([
      fetch(this.url + "&s=star&20wars")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            this.setState({ gallery1: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
      fetch(this.url + "&s=harry")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            this.setState({ gallery2: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
      fetch(this.url + "&s=lord%20of%20the%20rings")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response) {
            this.setState({ gallery3: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
      fetch(this.url + "&s=spider-man")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response) {
            this.setState({ gallery4: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
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
      <div>
        <MyNavbar showSearchResult={this.showSearchResult} />
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
