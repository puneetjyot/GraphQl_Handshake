import React, { Component } from "react";
import axios from 'axios'
import api_route from '../app-config';
import { graphql, compose } from 'react-apollo';
import {updateBasicDetails} from '../mutation/mutations'

class PersonalInfo extends Component {
  state = {
      showInfo:"block",
      editInfo:'none',
      email:'',
      dob:'',
      country:'',
      studentstate:'',
      city:'',
      phone:'',
      personalDetailObject:''
  };

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.personalData){
      this.setState({personalDetailObject:nextProps.personalData},()=>{console.log(this.state.personalDetailObject)})
    }

  }

 

    submitDetails= async() => 
    {

          console.log(this.state.studentstate)

          let mutationResponse = await this.props.updateBasicDetails({
            variables: {
              id:localStorage.getItem("loginId"),
              emailId: this.state.email,
              dob: this.state.dob,
              country: this.state.country,
              city: this.state.city,
              studentstate: this.state.studentstate,
              phone: this.state.phone
            }
        });
        let response = mutationResponse.data.updateBasicDetail;
        if (response) {
          console.log(response)
      
            if (response.status === "200") {
                this.setState({
                    // success: true,
                    // data: response.message,
                    // loginFlag: true
                    personalDetailObject:response
                });
            } else {
                this.setState({
                    message: response.message,
                    loginFlag: true
                });
            }
        }
      

          // axios
          //   .post(`${api_route.host}/student/basicdetails`, data, config)
          //   .then(res => {
          //      console.log(res.data);
          //   //   let newarr = this.state.experiencearr;
          //   //   newarr.push(res.data.experiencearr);
          //   //   console.log(newarr);
          //   //   this.setState({ experiencearr: newarr });
          //   this.setState({dataarr:res.data.result})
          //   console.log()
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
    }
  render() {
    return (
      <div className="container mt-4">
      {this.state.personalDetailObject?
        <div className="row">
          <div className="col-12 col-md-offset-1 shadow_style">
            <div className="card">
              <div className="m-3 d-flex justify-content-between">
                <h2 style={{ fontSize: "20px", fontWeight: "500" }}>
                  Personal Information
                </h2>
                <button onClick={(e)=>{
                    this.setState({showInfo:'none',editInfo:'block'})
                }}>
                <ion-icon name="create-outline" style={{fontSize:'20px'}}></ion-icon>
                </button>
              </div>
              <div className='p-2'>
              <div className='d-flex justify-content-between'>
             <h4 className="mt-4 ml-2" style={{fontSize:'18px',fontWeight:'600'}}>Email Address</h4>
            <div  style={{display:this.state.showInfo}}>
             <h4 className="ml-5 mr-2 mt-4"  style={{fontSize:'16px',fontWeight:'400'}}>{this.props.personalData?this.props.personalData.emailId:''}</h4>
             </div>
            <input  style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.props.personalData?this.props.personalData.emailId:''} onChange={e=>{
                this.setState({email:e.target.value})
            }} required></input>
             </div>

                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Date Of Birth</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.state.personalDetailObject?this.state.personalDetailObject.dob:''}</h4>
              </div>
                 <input  style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.state.personalDetailObject?this.state.personalDetailObject.dob:''} onChange={e=>{
                this.setState({dob:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  Country</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.state.personalDetailObject?this.state.personalDetailObject.country:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.state.personalDetailObject?this.state.personalDetailObject.country:''} onChange={e=>{
                this.setState({country:e.target.value})
            }}></input>
                 </div>
            
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  State</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2" style={{fontSize:'16px',fontWeight:'400'}}>{this.state.personalDetailObject?this.state.personalDetailObject.studentstate:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.state.personalDetailObject?this.state.personalDetailObject.studentstate:''} onChange={e=>{
                this.setState({studentstate:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>  City</h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.state.personalDetailObject?this.state.personalDetailObject.city:''}</h4>
                </div>
                 <input style={{display:this.state.editInfo}} type ='text' className="form-control" placeholder={this.state.personalDetailObject?this.state.personalDetailObject.city:''} onChange={e=>{
                this.setState({city:e.target.value})
            }}></input>
                 </div>
                 <div className='d-flex justify-content-between'>
                 <h4 className="m-2" style={{fontSize:'18px',fontWeight:'600'}}>Phone </h4>
                 <div  style={{display:this.state.showInfo}}>
                 <h4 style={{display:this.state.showInfo}} className="m-2 ml-5" style={{fontSize:'16px',fontWeight:'400'}}>{this.state.personalDetailObject?this.state.personalDetailObject.phone:''}</h4>
                </div>
                 <input  style={{display:this.state.editInfo }} type ='text' className="form-control" placeholder={this.state.personalDetailObject?this.state.personalDetailObject.phone:''} onChange={e=>{
                this.setState({phone:e.target.value})
            }}></input>
                 </div>
                 <button className='btn btn-success m-2' align='center' style={{display:this.state.editInfo}} onClick={e=>{
                     this.setState({editInfo:'none',showInfo:'block'})
                     this.submitDetails()
                 }}> Submit</button>
             
             </div>
            </div>
          </div>
        </div>
        :''}
      </div>
    );
  }
}

export default graphql(updateBasicDetails, { name: "updateBasicDetails" })(PersonalInfo);
