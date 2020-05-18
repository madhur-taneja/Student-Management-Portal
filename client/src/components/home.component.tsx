import React, { Component } from "react";

import UserService from "../services/user.service";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const spanStyling = {
  padding: '10px',
  display: 'inline',
  border: '0',
  background: 'blue',
  color: 'white',
  width: 'auto',
  height: 'auto',
  fontSize: '15px',
  lineHeight: '15px',
  fontFamily: 'Arial',
  borderRadius: '2px'
};

export default class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      content: "",
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Student Management Portal</h1>
          <p>Welcome! This portal is for students to access their grades online at the click of a button</p>
          <div className="my-5">
            <h3>{this.state.content}</h3>
          </div>
          {!this.state.currentUser && (
            <span className="input-group-btn" style={spanStyling}>
              <Link style={{ "color": "white", font: "bold" }} to="/login">Go to Login Page</Link>
            </span>
          )}
        </header>
      </div >
    );
  }
}