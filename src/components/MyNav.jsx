import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  InputGroup,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import kids_logo from "../components/kids_icon.png";
import logo from "../components/netflix_logo.png";

const MyNavbar = () => {
  const [searchString, setSearchString] = useState("");

  const searchStringHandler = (e) => {
    if (e.keyCode === 13) {
      console.log(searchString);
    } else {
      setSearchString(e.currentTarget.value);
    }
  };

  return (
    <Navbar
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "#221f1f", color: "black" }}
    >
      <Navbar.Brand href="/">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/home" active className="font-weight-bold">
            Home
          </NavLink>
          <NavLink to="/tv-shows" className="font-weight-bold">
            TV Shows
          </NavLink>
          <NavLink to="/movies" className="font-weight-bold">
            Movies
          </NavLink>
          <NavLink to="/recent" className="font-weight-bold">
            Recently Added
          </NavLink>
          <NavLink to="/list" className="font-weight-bold">
            My List
          </NavLink>
        </Nav>

        <span className="d-flex align-items-center">
          <InputGroup className="icons">
            <FormControl
              placeholder="Search here"
              aria-label="search"
              aria-describedby="basic-addon1"
              onKeyDown={searchStringHandler}
              onChange={searchStringHandler}
              value={searchString}
            />
          </InputGroup>
          <div id="kids">KID</div>
          <i className="fa fa-bell icons"></i>
          <NavDropdown
            id="nav-dropdown-start"
            title={<img src={kids_logo} id="logo" alt="logo" />}
          >
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/manage">Manage Movies</NavLink>
            <NavDropdown.Divider />
            <NavLink to="/logout">Logout</NavLink>
          </NavDropdown>
        </span>
      </Navbar.Collapse>
    </Navbar>
  );
  }

export default MyNavbar;
