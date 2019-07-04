import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./viewdetails.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";
let USN = "";
export default class Homepage extends React.Component {
  state = {
    age: 0,
    sem: 0,
    todos: []
  };
  componentWillMount() {
    USN = this.props.location.aboutProps.USN;
    console.log(USN);
    Axios.get(
      "  https://5szmwy6zia.execute-api.us-east-2.amazonaws.com/test/login/homepage/viewdeatils",
      {
        params: {
          USN: USN
        }
      }
    ).then(res => {
      console.log(res.data[0]);
      this.setState({
        todos: res.data[0]
      });
    });
  }
  getLayout() {
    return (
      <div className="image">
        <div className="image1">
          <p style={{ fontSize: 50, fontWeight: "bold" }}>
            Welcome,{this.state.todos.name}
          </p>
          <br />
          <br />
          <br />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Company</th>
                <th>Sem</th>
                <th>Stipend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.todos.Company}</td>
                <td>{this.state.todos.Sem}</td>
                <td>{this.state.todos.Stipend}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  render() {
    return this.getLayout();
  }
}
