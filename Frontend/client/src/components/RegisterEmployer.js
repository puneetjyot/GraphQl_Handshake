import React, { Component } from "react";
import { registerCompanyMutation } from '../mutation/mutations';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

class RegisterEmployer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      company_name: "",
     location:"",
      password: "",
      confirmpassword: "",
      phone:''
    };
  }
  handleSubmit = async e => {
     e.preventDefault();
    // //console.log(this.state.email,"nfnfdknfdkskd")
    // const { password, confirmpassword } = this.state;
    // if (password !== confirmpassword) {
    //   alert("Password doesn't match");
    // } else {
    //     const data = {
    //         company: {
    //           email: this.state.email,
    //           password: this.state.password,
    //           company_name:this.state.company_name,
    //           location:this.state.location,
    //           phone:this.state.phone
    //         }
    //       };
    //       this.props.registerCompany(data);
    // }

    let mutationResponse = await this.props.registerCompanyMutation({
      variables: {
        
          email: this.state.email,
          password: this.state.password,
          company_name:this.state.company_name,
          location:this.state.location,
          phone:this.state.phone

      }
    });
      let response = mutationResponse.data.addCompany;
  if (response) {
    
      if (response.status === "201") {
        localStorage.setItem("company",response.message)
        localStorage.setItem("loginId",response.loginId)

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
        return <Redirect to='/company/home' />
    }
    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="col-md-4 col-md-offset-1">
          <h1 style={{ margin: "6px" }}> Join the Handshake community</h1>
          <p style={{ fontSize: "18px", margin: "6px" }}>
            Discover jobs and internships based on your interests.
          </p>
         
        </div>
        <div
          className="col-md-6 col-md-offset-2"
          style={{ padding: "16px", marginBottom: "20px" }}
        >
        <h3>Sign Up as an Employer</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group col-md-8">
              <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                placeholder="Location"
                onChange={e => {
                        this.setState({ location: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="form-group col-md-8">
              <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Company Name
              </label>
              <input
                type="text"
                id="sname"
                name="sname"
                className="form-control"
                placeholder="Enter Company Name"
                onChange={e => {
                        this.setState({ company_name: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="form-group col-md-8">
              <label style={{ fontWeight: "500", marginBottom: "5px" }}>
                Phone Number
              </label>
              <input
                type="text"
                id="sname"
                name="sname"
                className="form-control"
                placeholder="Enter Phone number"
                onChange={e => {
                        this.setState({ phone: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="form-group col-md-8">
              <div>
                
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Email Address
                </label>
              </div>

              <label
                style={{
                  fontWeight: "500",
                  fontSize: "13px",
                  marginBottom: "5px"
                }}
              >
                Please use your school email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="john@doe.edu"
                onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                      required

              ></input>
            </div>
            <div className="col-md-8 d-flex p-0">
              <div className="form-group col-md-6 ">
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      required

                ></input>
              </div>
              <div className="form-group col-md-6">
                <label style={{ fontWeight: "500", marginBottom: "3px" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpass"
                  name="cpass"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={e => {
                        this.setState({ confirmpassword: e.target.value });
                      }}
                      required

                ></input>
              </div>
            </div>
            <div className="form-group col-md-8 m-3">
              <input type="submit" className="btn btn btn-primary"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default graphql(registerCompanyMutation, { name: "registerCompanyMutation" })(RegisterEmployer);

  

