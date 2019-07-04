import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./homepage.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";
let USN="";
export default class Homepage extends React.Component {
  
  state = {
    sem: 0,
    comp_name: "",
    stipend: 0,
    todos: []
  };
  componentWillMount() {
    console.log(this.props);

    Axios.get(
      "https://vjsy58cyhh.execute-api.us-east-2.amazonaws.com/test1/login/homepage",
      {
        params: {
          USN: this.props.location.aboutProps.USN
        }
      }
    ).then(res => {
      console.log(res.data[0]);
      USN=res.data[0].USN;
      this.setState({
        todos: res.data[0]
      });
    });
  }

  render() {
    
    return (
      
      <div>
        <div id="info">
          <br />
          <br />
          <br />
          <br />

          <img className="avatarimage" src="./avatar.png" />

          <br />
          <br />

          <p class="h1">USER PROFILE</p>

          <form action="" class="myform">
            <br />

            <table id="tableleft">
              <tr>
                <th>USN</th>
                <td id="a">{this.props.location.aboutProps.USN}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td id="b">{this.state.todos.name}</td>
              </tr>
              <tr>
                <th>Sem</th>
                <td id="c">{this.state.todos.sem}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td id="d">{this.state.todos.age}</td>
              </tr>
            </table>
          </form>
        </div>
        <p className="style10 " style={{ fontSize: 50, fontWeight: "bold" }}>
          Welcome,{this.state.todos.name}
        </p>
        <br />
        <br />
        <br />
        <div>
          <span className="tableheading">
            Please fill-in the details in the below table
          </span>

          {/* <form> */}
            <table id="table1" border="2" cellspacing="0" cellpadding="2px">
              <tr>
                <th colspan="5" height="50px">
                  <b className="headings">INTERNSHIP DETAILS</b>
                </th>
              </tr>

              <tr id="name">
                <th height="30px">SEMESTER</th>
                <th height="30px">COMPANY NAME</th>
                <th height="30px">STIPEND</th>
              </tr>

              <tr id="row1">
                <td>
                  <input
                    type="text"
                    placeholder="Enter SEM"
                    name="sem"
                    id="sem"
                    onChange={e => this.setState({ sem: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Company name"
                    name="comp_name"
                    id="comp_name"
                    onChange={e => this.setState({ comp_name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Stipend"
                    name="stipend"
                    id="stipend"
                    onChange={e => this.setState({ stipend: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <button
                    className="headings"
                    name="submit"
                    onClick={this.verify.bind(this)}
                  >Submit</button>
                </td>
              </tr>
            </table>
          {/* </form> */}
         <center>
            <br />
            <br />
            <Button className="click" variant="Dark">
              <NavLink
                to={{
                  pathname: "/viewdetails",
                  aboutProps: {
                    USN: this.props.location.aboutProps.USN
                  }
                }}
              >
                Click Here to view your details
              </NavLink>
            </Button>
          </center>
        </div>
      </div>
    );
  }
  
  verify() {
    if (document.getElementById("comp_name").value == "")
      alert("Company name field is empty");
    else if (
      document.getElementById("sem").value == "" ||
      (document.getElementById("sem").value > 8 ||
        document.getElementById("sem").value < 1)
    )
      alert("Sem name field is empty or value is invalid");
    else if (
      document.getElementById("stipend").value == "" ||
      (document.getElementById("stipend").value > 50000 ||
        document.getElementById("stipend").value < 0)
    )
      alert("Stipend field is empty or value is invalid");
    else {
      this.postData();
    }
  }
  postData() {
   
    alert(this.props.location.aboutProps.USN);

    const comp_name = this.state.comp_name;
    const sem = this.state.sem;
    const stipend = this.state.stipend;
    const USN = this.props.location.aboutProps.USN;
    const data = {
      comp_name,
      sem,
      stipend,
      USN
    };
alert("hi");
    Axios.post(
      "https://5szmwy6zia.execute-api.us-east-2.amazonaws.com/test/login/homepage",
      data
    )
      .then(response => {
        console.log(response);
        if (response) {
          alert("success");
        } else {
          alert("failure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }      
}
