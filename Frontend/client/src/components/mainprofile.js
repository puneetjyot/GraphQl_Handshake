import React, { Component } from "react";
import ProfilePic from "./profilepic";
import PersonalInfo from "./PersonalInfo";
import { Redirect } from "react-router-dom";
import Journey from "./Journey";
import Education from "./Education";
import Experience from "./experience"
import Skills from './skills'
import { graphql, compose } from 'react-apollo';
import {getStudent} from '../query/queries'
import { updateName } from "../redux/actions/profileAction";

class MainProfile extends Component {
  state = {};
  componentDidMount(){
   
  }
  render() {
   
    if (!localStorage.getItem('student')) {
      return <Redirect to="/student/login" />;
    }
    else{
        // this.props.getEducation()
    }

    let result=this.props.getStudent;
    if(result&&result.name){
      console.log(result)
    }
    return (
      <div className="d-flex container">
       
          <div className="col-4">
             <ProfilePic profileData={result.getStudent} />
            <Skills skillData={result.getStudent}/>
            <PersonalInfo personalData={result.getStudent} />
          </div>
         <div className="col-8">
            <Journey journeyData={result.getStudent}/>
            <Education educationData={result.getStudent} />
            
                <Experience experienceData={result.getStudent}/> 
             
          </div>
       
      </div>
    );
  }
}

export default graphql(getStudent, {
  name: "getStudent",
  options: () => {
    return {
      variables: {
        studentId: localStorage.getItem("loginId"),
      },
    };
  },
})(MainProfile);


