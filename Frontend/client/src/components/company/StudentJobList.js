import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";
import api_route from "../../app-config";

import "../../styles/jobs.css";
import { getStudentByJob } from "../../query/queries";


class StudentJobList extends Component {
  state = {
    studentarr: [],
    perStudentArr: [],
    redirect: false,
    id: "",
    value: "Pending",
    path: "",
  };


  async componentDidMount() {
    var { data } = await this.props.client.query({
      query: getStudentByJob,

      variables: { jobId: localStorage.getItem("jobid") },
      fetchPolicy: "no-cache",
    });

    console.log(data);
    
    this.setState({ studentarr: data.getStudentByJob });
    this.setState({ perStudentArr: data.getStudentByJob });
  }


  filterName = (value) => {
    let result = [];
    console.log(value);
    this.state.perStudentArr.map((i) => {
      //console.log( i.company_basic_detail.company_name.indexOf(value))
      if (
        i.student_id.name.toLowerCase().indexOf(value) >= 0 ||
        i.student_id.name.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ studentarr: result });
  };
  
  filterMajor = (value) => {
    let result = [];
    console.log(value);
    this.state.perStudentArr.map((i) => {
      //console.log( i.company_basic_detail.company_name.indexOf(value))

      if (
        i.student_id.educations[0].major.toLowerCase().indexOf(value) >= 0 ||
        i.student_id.educations[0].major.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ studentarr: result });
  };
  filterCollege = (value) => {
    let result = [];
    console.log(value);
    this.state.perStudentArr.map((i) => {
      //console.log( i.company_basic_detail.company_name.indexOf(value))
      if (
        i.student_id.educations[0].school_name.toLowerCase().indexOf(value) >=
          0 ||
        i.student_id.educations[0].school_name.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ studentarr: result });
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("visitedstudent", this.state.id);
      return <Redirect to={`/student/profile/${this.state.id}`} />;
    }
  };
  render() {
    return (
      <div className="main-div">
        {this.renderRedirect()}
        <div className="style__secondary-nav___3_H_G pb-2 mb-3" align="center">
          <h2 className="ml-5" style={{ fontSize: "20px", fontWeight: "600" }}>
            Applied Student List
          </h2>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-3">
              <div className="card">
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                    Filters
                  </h3>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Name{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter a name..."
                    onChange={(e) => {
                      this.filterName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Major{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter a major..."
                    onChange={(e) => {
                      this.filterMajor(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="style__divider___1j_Fp"></div>
                <div
                  className="style__card-item___B1f7m:first-child"
                  style={{ padding: "16px" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    College Name{" "}
                  </h3>
                </div>
                <div
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter college name..."
                    onChange={(e) => {
                      this.filterCollege(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="card" style={{ height: "500px" }}>
                <div className="style__jobs___3seWY">
                  <div className="style__card-item___B1f7m:last-child"></div>
                  <div className="style__media-body___1_M6P">
                    {this.state.perStudentArr.length > 0 ? (
                      this.state.perStudentArr ? (
                        this.state.studentarr.map((i) => (
                          <div>
                            <div className="p-2">
                              <div class="card mt-4">
                                <div
                                  className="m-3"
                                  style={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div className=" d-flex justify-content-between">
                                    <div className='d-flex'>
                                    <div>
                                    <img style={{width:"100px"}} src={`${api_route.host}//${i.student_id.profile_picture}`}></img>
                                    </div>
                                    <div
                                      onClick={(e) => {
                                        this.setRedirect(
                                          i.student_id.id
                                        );
                                        this.setState({
                                          id: i.student_id.id,
                                        });
                                      }}
                                    >
                                      <h3
                                        className="ml-5"
                                        style={{
                                          fontSize: "20px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {" "}
                                        {i.student_id ? i.student_id.name : ""}
                                      </h3>
                                      <h3
                                      className="ml-5"
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {" "}
                                      {i.student_id ? i.student_id.college : ""}
                                    </h3>
                                    <h3
                                              className="ml-5"
                                              style={{
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                color: "rgba(0,0,0,.8)",
                                              }}
                                            >
                                              {" "}
                                              {i.student_id ? i.student_id.educations[0].education_level + "," : ""}
                                              {i.student_id ? i.student_id.educations[0].major : ""}
                                            </h3>
                                            <h3
                                              className="ml-5"
                                              style={{
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                color: "rgba(0,0,0,.8)",
                                              }}
                                            >
                                              Graduate On {i.student_id.educations[0] ? i.student_id.educations[0].end_time : ""}
                                            </h3>
                                    </div>
                                    </div>
                                    <div>
                                      
                                    </div>
                                    <div className="ml-5 col-3">
                                      <select
                                        className="form-control"
                                        style={{ textDecoration: "none" }}
                                        value={this.state.value}
                                        onChange={(e) => {
                                          this.setState(
                                            { value: e.target.value },
                                            () => {
                                              this.changeStatus(
                                                i.job_id,
                                                i.student_basic_detail_id
                                              );
                                            }
                                          );
                                        }}
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">
                                          Reviewed
                                        </option>
                                        <option value="Accepted">
                                          Accepted
                                        </option>
                                        <option value="Declined">
                                          Declined
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div
                                    onClick={(e) => {
                                      this.setRedirect(
                                        i.student_id.id
                                      );
                                      this.setState({
                                        id: i.student_id.id,
                                      });
                                    }}
                                  >
                                    
                                  </div>
                                  
                                       
                                          <div
                                            className="d-flex justify-content-between"
                                            onClick={(e) => {
                                              this.setRedirect(
                                                i.student_id.id
                                              );
                                              this.setState({
                                                id: i.student_id.id,
                                              });
                                            }}
                                          >
                                            
                                           
                                          </div>
                                       
                                          
                                        
                                    
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        ""
                      )
                    ) : (
                      <div align="center">
                        <h3 style={{ color: "rgba(0,0,0,0.58" }}>
                          No one applied yet!
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(StudentJobList)
