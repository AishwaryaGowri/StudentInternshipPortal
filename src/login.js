import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Axios from "axios";
import "./App.css";

export default class App extends Component {
  state = {
    USN: "",
    password: ""
  };
  render() {
    return (
      <div>
        <br />
        <img src="./bmslogo.png" width="20%" className="style2" />
        <center>
          <label className="style5">
            <b>BMS COLLEGE OF ENGINEERING</b>
          </label>
        </center>
        <br />
        <center>
          <label className="style3">
            <b>Student Internship Portal</b>
          </label>
        </center>

        <img
          id="image1"
          className="style4"
          src="./bmsce.jpg"
          width="1535px"
          height="100%"
        />

        <div>
          <form className="login" onSubmit={this.verify.bind(this)}>
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter USN"
              name="USN"
              id="USN"
              onChange={e => this.setState({ USN: e.target.value })}
            />

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="password"
              onChange={e => this.setState({ password: e.target.value })}
            />

            <button variant="success" type="submit" class="btn">
              <b>login</b>
            </button>
            <br />
            <button className="route" id="n3">
              <NavLink
                to={{
                  pathname: "/homepage",
                  aboutProps: {
                    USN: this.state.USN //pass variables(to homepage)
                  }
                }}
              >
                Profile page
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    );
  }
  verify(e) {
    e.preventDefault();
    if (document.getElementById("USN").value == "") {
      alert("USN field is empty");
    } else if (document.getElementById("password").value == "") {
      alert("password field is empty");
    } else this.submit();
  }
  submit() {
    const USN = this.state.USN;
    const password = this.state.password;
    const data = {
      USN,
      password
    };
    Axios.post(
      "https://5szmwy6zia.execute-api.us-east-2.amazonaws.com/test/login",
      data
    )
      .then(response => {
        console.log(response);
        if (response.data[0] != null) {
          alert("success");
          console.log(response.data[0].name);
          // nam = response.data[0].USN;
          document.getElementById("n3").style.visibility = "visible";
        } else {
          alert("failure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
