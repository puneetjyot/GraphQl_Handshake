import React, { Component } from "react";
import '../styles/journey.css'
import axios from "axios";
import api_route from '../app-config'
import { graphql, compose } from 'react-apollo';
import {updateJourney} from '../mutation/mutations'

class Journey extends Component {
 constructor(props){
   super(props);
  this.state = {
    saveflag:false,
    value:'',
    journeyvalue:''
  };
}
componentWillReceiveProps(nextProps){
  this.setState({journeyvalue:nextProps.journeyData.career_objective})
}

  handleSubmit=async ()=>{
  document.getElementById("journey-field").value=""
  let mutationResponse = await this.props.updateJourney({
    variables: {
      id:localStorage.getItem("loginId"),
     career_objective:this.state.value
    }
});
let response = mutationResponse.data.updateJourney;
if (response) {
  this.setState({ saveflag: false });
  console.log(response)
  this.setState({journeyvalue:response.career_objective})

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

    

    const show = (this.state.saveflag) ? "show" : "" ;
    return (
      <div className="container mt-3 p-2 pb-5">
        <div className="card jshadow">
          <div className="card-body">
            <h4 className="card-title" style={{fontSize:"18px",fontWeight:"500"}}>My Journey</h4>
            <h6 className="card-subtitle mt-1 mb-2 text-muted"></h6>
            <p className="card-text" style={{color:'#1569e0',fontSize:'14px'}}>
            What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?
            </p>
            <p className="card-text" style={{fontSize:'14px'}}>
            {this.state.journeyvalue}
            </p>
            <textarea name="bio" placeholder="Type your introduction..." rows="4" type="textarea" id="journey-field" className="form-control"  onClick={e=>{
              this.setState({saveflag:true}
              )
            }} onChange={e=>{
              this.setState({value:e.target.value})
            }}></textarea>
           <div align='right' id="save" className={"collapse navbar-collapse " + show} style={{marginTop:"20px"}}>
            <button className="btn btn-primary" onClick={
              this.handleSubmit
            }>Save</button>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(updateJourney, { name: "updateJourney" })(Journey);
