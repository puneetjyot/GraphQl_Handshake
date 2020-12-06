import React, { Component } from "react";
import VisitedEducation  from "./VisitedEducation";
import VisitedPersonalInfo from "./VisitedPersonalInfo";
import { Redirect } from "react-router-dom";
import VisitedJourney  from "./VisitedJourney";
import VisitedProfilePic from "./VisitedProfilePic";
import VisitedExperience from "./VisitedExperience"
import VisitedSkills from './VisitedSkills'
import { graphql, compose } from 'react-apollo';
import {getStudent} from '../../query/queries'
import { updateName } from "../../redux/actions/profileAction";

class MainVisitedProfile extends Component {
  state = {};
  componentDidMount(){
   
  }
  render() {
   
   

    let result=this.props.getStudent;
    if(result&&result.name){
      console.log(result)
    }
    return (
      <div className="d-flex container">
       
          <div className="col-4">
             <VisitedProfilePic profileData={result.getStudent} />
             <VisitedSkills skillData={result.getStudent}/>
           <VisitedPersonalInfo personalData={result.getStudent} />
        
         </div>
         <div className="col-8">
            <VisitedJourney journeyData={result.getStudent}/>
            <VisitedEducation educationData={result.getStudent} />
            
                <VisitedExperience experienceData={result.getStudent}/> 
              
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
        studentId: localStorage.getItem("visitedstudent"),
      },
    };
  },
})(MainVisitedProfile);


