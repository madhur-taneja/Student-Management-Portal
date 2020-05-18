import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";


export default class Profile extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      // User Based States 
      currentUser: AuthService.getCurrentUser()
      
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="d-flex justify-content-between mb-5">
            <div>
              <h1> Welcome! </h1>
              <h4>
                <strong>{currentUser.username}'s</strong> Profile
              </h4>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
            </div>
            <div>
              <Link to="/settings">
                <button className="btn btn-secondary">
                  Settings
                </button>
              </Link>
            </div>
          </div>
          <div>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}