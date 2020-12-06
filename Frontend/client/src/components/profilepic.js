import React, { Component } from "react";
import "../styles/profilepic.css";
// import { updateName, getEducation } from "../redux/actions/profileAction";
import {updateName} from '../mutation/mutations'
import { connect } from "react-redux";
import axios from "axios";
import api_route from "../app-config";
import FormData from 'form-data'
import { graphql, compose } from 'react-apollo';

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveflag: false,
      newName: "",
      temp: "",
      dataarr: [],
      picture:'',
      propicture:'',
      profileName:''
    };
  }
  componentWillReceiveProps(nextProps)
  {
    console.log(nextProps)
    this.setState({profileName:nextProps.profileData.name})


  }
  

  handleEdit = async () => {
    let mutationResponse = await this.props.updateName({
      variables: {
        id:localStorage.getItem("loginId"),
       name:this.state.temp
      }
  });
  let response = mutationResponse.data.updateName;
  if (response) {
    this.setState({ saveflag: false });
    console.log(response)
    this.setState({profileName:response.name})

      if (response.status === "200") {
          this.setState({
              
              newName:response
          });
      } else {
          this.setState({
              message: response.message,
              loginFlag: true
          });
      }
  };

}


  render() {
    const show = this.state.saveflag ? "show" : "";
    const showbutton = this.state.saveflag ? "" : "show";
    const data = this.state.dataarr;
    console.log("sdfbdsfbbhjbhjhbfdjhbdsbfhjbjfd",this.state.dataarr);
    console.log(this.props.profileData);
    return (
      <div>
      {
      
        this.props.profileData?
      <div className="container mt-3">
      
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div align="center" className="mt-2 card-body">
              {console.log("Picture here")}
              {this.props.profileData.profile_picture!=''?
             
              <img  className="circular-avatar-image avatar-image" src={ `${api_route.host}//${this.props.profileData.profile_picture}`} />:
              <form onSubmit={this.updatePic}>
              <div>
                <button className="style__edit-photo___B-_os">
                  <div>
                    <ion-icon
                      size="large"
                      name="camera"
                      style={{ color: "#1569e0" }}
                    ></ion-icon>
                  </div>
                 
                  <div>
                    {" "}
                    {/* <p style={{ color: "#1569e0", fontSize: "13px" }}>
                      Add Photo

                    </p> */}
                   
                    <input style={{ color: "#1569e0", fontSize: "13px" }} type='file' name='file' onChange={e=>{
                      console.log(e.target.files[0])
              this.setState({picture:e.target.files[0]})
            }} ></input>
                   
                  </div>
                   
                </button>
                </div>

                <input style={{ fontSize: "10px" }} type='submit' className='btn btn-primary mt-3' value='Edit Pic'></input>
                 
                </form>
                }
              </div>

              <div className="" align="center">
                {true? (
                  
                  <div>
               
                    <h4
                      className="card-title"
                      style={{ fontSize: "24px", fontWeight: "500" }}
                    >
                      {this.state.profileName ? this.state.profileName : ""}
                    </h4>
                    <h4
                      className="card-title"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {this.props.profileData.college
                        ? this.props.profileData.college
                        : ""}
                    </h4>
                    <h4
                      className="card-title"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {this.props.profileData.educations.length>0
                        ? this.props.profileData.educations[0].education_level
                        : ""}
                      ,
                      {this.props.profileData.educations.length>0
                        ? this.props.profileData.educations[0].major
                        : ""}
                    </h4>
                    <h4
                      className="card-title"
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "rgba(0,0,0,.56)"
                      }}
                    >
                      {this.props.profileData.educations.length>0
                        ? this.props.profileData.educations[0].education_level
                        : ""}{" "}
                      • GPA:{" "}
                      {this.props.profileData.educations.length>0
                        ? this.props.profileData.educations[0].gpa
                        : ""}
                    </h4>

                    <div className={"collapse navbar-collapse " + showbutton}>
                      <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.setState({ saveflag: true });
                        }}
                      >
                        Edit info
                      </button>
                    </div>
                    <div className={"collapse navbar-collapse " + show}>
                      <input
                        type="text"
                        placeholder={data.student?data.student.name:''}
                        onChange={e => {
                          this.setState({ temp: e.target.value });
                        }}
                      ></input>
                      <button
                        className="btn btn-primary"
                        onClick={e => {
                          this.handleEdit();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        
      </div>
      
      :''}
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     studentdata: state.profileReducer.educationarrs
//     // authCompany: state.auth.authCompany
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     getEducation: () => dispatch(getEducation()),
//     updateName: name => dispatch(updateName(name))
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePic);
export default graphql(updateName, { name: "updateName" })(ProfilePic);
