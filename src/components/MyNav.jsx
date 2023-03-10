import { Component } from "react";
import {
  Navbar,
  Nav,
  InputGroup,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import kids_logo from "../components/kids_icon.png";
import logo from "../components/netflix_logo.png";

class MyNavbar extends Component {
  state = {
    searchString: "",
  };

  searchStringHandler = (e) => {
    if (e.keyCode === 13) {
      this.props.showSearchResult(this.state.searchString);
    } else {
      this.setState({ searchString: e.currentTarget.value });
    }
  };

  render() {
    return (
      <Navbar
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "#221f1f", color: "black" }}
      >
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active className="font-weight-bold" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              TV Shows
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Movies
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              Recently Added
            </Nav.Link>
            <Nav.Link className="font-weight-bold" href="/">
              My List
            </Nav.Link>
          </Nav>
          <span className="d-flex align-items-center">
            <InputGroup className="icons">
              <FormControl
                placeholder="Search here"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyDown={this.searchStringHandler}
                onChange={this.searchStringHandler}
                value={this.state.searchString}
              />
            </InputGroup>
            <div id="kids">KIDS</div>
            <i className="fa fa-bell icons"></i>
            <NavDropdown
              id="nav-dropdown-start"
              title={<img src={kids_logo} id="logo" alt="logo" />}
            >
              <NavDropdown.Item href="#profile">Account</NavDropdown.Item>
              <NavDropdown.Item href="#">Manage Movies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Logout</NavDropdown.Item>
            </NavDropdown>
          </span>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNavbar;
