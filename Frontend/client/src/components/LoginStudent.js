import React, { Component } from "react";
import "../styles/login.css";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { studentLoginMutation } from '../mutation/mutations';
import { graphql } from 'react-apollo';

class LoginStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      errors: ""
    };
  }
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  handleSubmit = async e => {
    e.preventDefault();
    //console.log(this.state.email,"nfnfdknfdkskd")
    let mutationResponse = await this.props.studentLoginMutation({
      variables: {
          email: this.state.email,
          password: this.state.password,
      }
  });
  let response = mutationResponse.data.studentLogin;
  if (response) {
    localStorage.setItem("student",response.message)
    localStorage.setItem("loginId",response.loginId)


      if (response.status === "200") {
          this.setState({
              success: true,
              data: response.message,
              loginFlag: true
          });
      } else {
          this.setState({
              message: response.message,
              loginFlag: true
          });
      }
  }


  };
  render() {
    if(this.state.success) {
      return <Redirect to='/student/home' />
  }
    return (
      <div>
      
         
       
        <div className="row">
          <div className="col-3">
            <div
              style={{
                backgroundColor: "#1569e0",
                color: "white",
                position: "relative",
                textAlign: "center",
                height: "550px"
              }}
            >
              <a className="logo" href="/">
                <img
                  alt="Handshake logo image"
                  height="42"
                  src="https://handshake-production-cdn.joinhandshake.com/assets/logo-icon-2d294d9834da88f5fdf0ab747dd89fb15f8ab7c12a3e193294bab3d522d71a2c.svg"
                ></img>
              </a>
              <div className="content">
                <h1 style={{ paddingTop: "30%" }}>Get the job done .</h1>
                <h3 style={{ paddingTop: "10%",color:"yellow" }}>Students</h3>
                <p>Launch the next step in your career.</p>
                <h3 style={{ paddingTop: "3%" }}>Employers</h3>
                <p>Hire the next generation of talent.</p>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-5"></div>
              <div className="col-4">
              <p style={{ color: "red",marginTop:"5px",fontWeight:"bold" }}>{this.state.message}</p>
                <h1 style={{ marginBottom: "9px", fontWeight: "bold" }}>
                  Sign in
                </h1>
                <h3 style={{ fontWeight: "bold" }}>Students and alumni</h3>
                <p>Please sign in with your email and password</p>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="email@example.edu"
                      type="email"
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                      required
                    ></input>
                  </div>

                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="password"
                      type="password"
                      pattern=".{8,}"
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="submit"
                      id="mySubmit"
                      value="Login"
                      style={{
                        color: "white",
                        backgroundColor: "#1569e0",
                        border: "1px solid #1569e0"
                      }}
                    ></input>
                  </div>
                </form>
                <h6>No account?<a href="/student/register"> Sign up here</a></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   console.log(state)
//   return {
//       authStudent: state.auth.authStudent,
//       autherror: state.auth.autherror
//      // loginSeller: state.loginReducer.isAuthenticatedSeller
//   }   
// }
// const mapDispatchToProps = dispatch => {
//     return {
//       loginStudent: payload => dispatch(loginStudent(payload))
//     };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(LoginStudent);
export default graphql(studentLoginMutation, { name: "studentLoginMutation" })(LoginStudent);
