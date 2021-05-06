import React, { Component } from "react";
import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";

class NFNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  searchStringHandler = (e) => {
    if (e.keyCode === 13) {
      this.props.showSearchResult(this.state.searchString);
    } else {
      this.setState({ searchString: e.currentTarget.value });
    }
  };

  render() {
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
        <Link className="navbar-brand font-weight-bold" to="/" >
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ width: "100px", height: "55px" }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link font-weight-bold" to="/" >
              <div className={`nav-link${this.props.location.pathname === '/' ? ' active' : ''}`}>Home</div>
            </Link>
            <Link className="nav-link font-weight-bold" to="/tvshows" >
              <div className={`nav-link${this.props.location.pathname === '/tvshows' ? ' active' : ''}`}>TV Shows</div>
            </Link>
            <Link className="nav-link font-weight-bold" to="/movies" >
              <div className={`nav-link${this.props.location.pathname === '/movies' ? ' active' : ''}`}>Movies</div>
            </Link>
            <Link className="nav-link font-weight-bold" to="/mylist" >
              <div className={`nav-link${this.props.location.pathname === '/mylist' ? ' active' : ''}`}>My List</div>
            </Link>
            <Link className="nav-link font-weight-bold" to="/registration" active>
              <div className={`nav-link${this.props.location.pathname === '/registration' ? ' active' : ''}`}>Registration</div>
            </Link>
          </Nav>
          <span className="d-none d-md-flex align-items-center">
            <InputGroup className="icons">
              <FormControl
                placeholder="Search and Press Enter"
                aria-label="search"
                aria-describedby="basic-addon1"
                onKeyDown={this.searchStringHandler}
                onChange={this.searchStringHandler}
                value={this.state.searchString}
              />
            </InputGroup>
            <div id="kids">KIDS</div>
            <i className="fa fa-bell icons"></i>
            <i className="fa fa-user icons"></i>
          </span>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NFNavbar)
