import React, { Component } from "react";
import api_route from "../../app-config";
import axios from "axios";
import "../../styles/profilepic.css";
import "../../styles/company.css";
import { graphql, compose, withApollo } from "react-apollo";
import { getCompany, getJobs } from "../../query/queries";
import "../../styles/profilepic.css";
import { addJob, editInfo } from "../../mutation/mutations";
import { Redirect } from "react-router-dom";

class CompanyHome extends Component {
  state = {
    companyobj: "",
    showInfo: "block",
    editInfo: "none",
    name: "",
    phone: "",
    location: "",
    jobarr: [],
    jobobj: "",
    perjobarr: [],
    modalShow: "none",
    jobtitle: "",
    value: "Full-Time",
    job_category: "Full-Time",
    joblocation: "",
    salary: "",
    deadline: "",
    jobdescription: "",
    addSuccessMsg: "",
    redirect:""
  };
  async componentDidMount() {
    var { data } = await this.props.client.query({
      query: getCompany,

      variables: { companyId: localStorage.getItem("loginId") },
      fetchPolicy: "no-cache",
    });

    console.log(data);
    this.setState({ companyobj: data.getCompany });
    var { data } = await this.props.client.query({
      query: getJobs,

      variables: { companyId: localStorage.getItem("loginId") },
      fetchPolicy: "no-cache",
    });

    console.log(data);
    this.setState({ jobarr: data.getJobs });
    this.setState({ perjobarr: data.getJobs });
  }
  filterByTitleOrCompany = (value) => {
    let result = [];
    console.log(value);
    this.state.perjobarr.map((i) => {
      console.log(i.company_name.indexOf(value));
      if (
        i.job_title.toLowerCase().indexOf(value) >= 0 ||
        i.company_name.toLowerCase().indexOf(value) >= 0 ||
        i.job_title.indexOf(value) >= 0 ||
        i.company_name.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ jobarr: result });
  };

  filterByLocation = (value) => {
    let result = [];
    console.log(value);
    this.state.perjobarr.map((i) => {
      //console.log( i.company_name.indexOf(value))
      if (
        i.location.toLowerCase().indexOf(value) >= 0 ||
        i.location.indexOf(value) >= 0
      ) {
        result.push(i);
      }
    });
    this.setState({ jobarr: result });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.addJob({
      variables: {
        job_title: this.state.jobtitle,
        deadline: this.state.deadline,
        location: this.state.joblocation,
        salary: this.state.salary,
        job_description: this.state.jobdescription,
        job_category: this.state.job_category,
        companyId: localStorage.getItem("loginId"),
      },
      refetchQueries: [
        {
          query: getJobs,
          variables: { companyId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.addJob;
    if (response) {
      this.setState({ saveflag: false });
      console.log(response);
      // this.setState({journeyvalue:response.career_objective})

      if (response.status === "200") {
        this.setState({ addSuccessMsg: "Job added Successfully" });
      } else {
        this.setState({
          message: response.message,
        });
      }
    }
  };

  editCompanyInfo = async (e) => {
    //console.log(this.state.schoolname+" "+editid)

    // let config = {
    //   headers: {
    //     Authorization: `${window.localStorage.getItem("company")}`,
    //   },
    // };
    // let data = {
    //   company: {
    //     location: this.state.location ? this.state.location : "",
    //     phone: this.state.phone ? this.state.phone : "",
    //     name: this.state.name ? this.state.name : "",
    //   },
    // };
    // axios
    //   .put(`${api_route.host}/company/`, data, config)
    //   .then((res) => {
    //     console.log("response coming");
    //     // let newarr = this.state.educationarr;
    //     // newarr.push(res.data);
    //     console.log(res.data);
    //     this.setState({ companyobj: res.data.company });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    let mutationResponse = await this.props.editInfo({
      variables: {
        location: this.state.location,
        phone: this.state.phone,
        name: this.state.name,
        id: localStorage.getItem("loginId"),
      },
      refetchQueries: [
        {
          query: getCompany,
          variables: { companyId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.editInfo;
    if (response) {
      this.setState({ saveflag: false });
      console.log(response);
      // this.setState({journeyvalue:response.career_objective})

      if (response.status === "200") {
        console.log(response);
      } else {
        this.setState({
          message: response.message,
        });
      }
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("jobid", this.state.id);
      return <Redirect to={`/job/student/${this.state.id}`} />;
    }
  };



  render() {
    let result = this.props.getJobs;
    let companyresult = this.props.getCompany;
    if (companyresult) {
      console.log(companyresult.getCompany);
    }
    // if(result&&result.getJobs)
    // {
    //   console.log(result)
    //  // this.updateJobs(result.getJobs)
    //   // this.setState({ jobarr: result.getJobs });
    //   // this.setState({ perjobarr: result.getJobs });
    // }
    return (
      <div>
              {this.renderRedirect()}

        <div className="container d-flex mt-3 p-2 pb-5">
          <div className="col-3">
            <div className="card mt-3">
              <div className="card-title p-2" align="center">
                <div>
                  <div className="">
                    {/* <ion-icon
                        size="large"
                        name="camera"
                        style={{ color: "#1569e0" }}
                      ></ion-icon> */}

                    <img
                      className="circular-avatar-image avatar-image"
                      src={`${api_route.host}//${companyresult.getCompany?companyresult.getCompany.profilepicaddress:''}`}
                    ></img>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    {companyresult.getCompany
                      ? companyresult.getCompany.company_name
                      : ""}
                  </h3>
                </div>
              </div>
              <div
                style={{ display: this.state.showInfo }}
                align="center"
                className="ml-4"
              >
                {" "}
                <div className="d-flex">
                  <div className="d-flex ml-3">
                    <ion-icon name="location"></ion-icon>
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {companyresult.getCompany
                        ? companyresult.getCompany.location
                        : ""}
                    </p>
                  </div>
                  <div className="d-flex ml-3">
                    <ion-icon name="call"></ion-icon>
                    <p
                      style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}
                      className="ml-2"
                    >
                      {companyresult.getCompany
                        ? companyresult.getCompany.phone
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mr-3">
                  <p style={{ color: "rgba(0,0,0,.56)", fontSize: "14px" }}>
                    {" "}
                    email:{" "}
                    {companyresult.getCompany
                      ? companyresult.getCompany.emailId
                      : ""}
                  </p>
                </div>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  {companyresult.getCompany
                    ? companyresult.getCompany.description
                    : ""}
                </p>
              </div>
              <div
                style={{ display: this.state.editInfo }}
                align="center"
                className="ml-4"
              >
                <table>
                  <tr>
                    <td>Name</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            companyresult.getCompany
                              ? companyresult.getCompany.company_name
                              : ""
                          }
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        ></input>
                      </div>
                    </td>
                  </tr>

                  <div className="mt-1"></div>
                  <tr>
                    <td>Phone</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            companyresult.getCompany
                              ? companyresult.getCompany.phone
                              : ""
                          }
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                          }}
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <div className="mt-1"></div>
                  <tr>
                    <td>Location</td>
                    <td>
                      <div className="col-11">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            companyresult.getCompany
                              ? companyresult.getCompany.location
                              : ""
                          }
                          onChange={(e) => {
                            this.setState({ location: e.target.value });
                          }}
                        ></input>
                      </div>
                    </td>
                  </tr>
                </table>
                <div
                  style={{ display: this.state.editInfo }}
                  className="col-7 ml-2 mt-2"
                >
                  <button
                    className="btn btn-primary m-2"
                    onClick={(e) => {
                      this.setState({ editInfo: "none", showInfo: "block" });
                      this.editCompanyInfo();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* <div className="p-2">
                <p>
                  {companyresult.getCompany
                    ? companyresult.getCompany.description
                    : ""}
                </p>
              </div> */}
              <div
                style={{ display: this.state.showInfo }}
                className="col-7 ml-5 mt-2"
                align="center"
              >
                <button
                  className="btn btn-primary m-2"
                  onClick={(e) => {
                    this.setState({ editInfo: "block", showInfo: "none" });
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="container mt-3 p-2 pb-5"></div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex col-6">
                  <div
                    className="m-2"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="search"></ion-icon>
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-5"
                    placeholder="Job titles or keywords"
                    onChange={(e) => {
                      this.filterByTitleOrCompany(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex col-6">
                  <div
                    className="m-2"
                    style={{ left: "40px", position: "relative" }}
                  >
                    <ion-icon name="location"></ion-icon>
                  </div>
                  <input
                    type="text"
                    className="form-control p-2 pl-5"
                    placeholder="City, State, Zip Code, or Address"
                    onChange={(e) => {
                      this.filterByLocation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex p-2 ml-2">
                  <button
                    className="style__pill___3uHDM"
                    onClick={(e) => {
                      const result = this.state.perjobarr.filter(
                        (i) => i.job_category == "Full-Time"
                      );
                      this.setState({ jobarr: result });
                    }}
                  >
                    Full-Time Job
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={(e) => {
                      const result = this.state.perjobarr.filter(
                        (i) => i.job_category == "Part-Time"
                      );
                      this.setState({ jobarr: result });
                    }}
                  >
                    Part-Time
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={(e) => {
                      const result = this.state.perjobarr.filter(
                        (i) => i.job_category == "Internship"
                      );
                      this.setState({ jobarr: result });
                    }}
                  >
                    Internship
                  </button>
                  <button
                    className="style__pill___3uHDM"
                    onClick={(e) => {
                      const result = this.state.perjobarr.filter(
                        (i) => i.job_category == "On-Campus"
                      );
                      this.setState({ jobarr: result });
                    }}
                  >
                    On-Campus
                  </button>
                </div>
                <div className="p-2 ml-2">
                  <button
                    className="style__pill___3uHDM"
                    onClick={(e) => {
                      this.setState({ modalShow: "block" });
                    }}
                  >
                    <ion-icon name="add"></ion-icon>
                    Add Jobs
                  </button>
                </div>
                <div
                  id="myModal"
                  className="modal"
                  style={{ display: this.state.modalShow }}
                >
                  <div
                    className="modal-content col-5"
                    style={{ fontFamily: "Suisse" }}
                  >
                    <div className="container">
                      <span
                        class="close"
                        onClick={(e) => {
                          this.setState({ modalShow: "none" });
                          this.setState({ addSuccessMsg: "" });
                        }}
                      >
                        &times;
                      </span>
                      {this.state.addSuccessMsg ? (
                        <p style={{ color: "green" }}>
                          {this.state.addSuccessMsg}
                        </p>
                      ) : (
                        ""
                      )}
                      <div align="center">
                        <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                          New Job
                        </h3>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Job Title
                          </label>
                          <input
                            type="text"
                            id="jobtitle"
                            name="jobtitle"
                            className="form-control"
                            placeholder="Enter Job Title"
                            onChange={(e) => {
                              this.setState({ jobtitle: e.target.value });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Category
                          </label>
                          <select
                            value={this.state.job_category}
                            id="category"
                            className="form-control"
                            onChange={(e) => {
                              this.setState({ job_category: e.target.value });
                            }}
                            required
                          >
                            <option value="Full-Time">Full Time</option>
                            <option value="Part-Time">Part Time</option>
                            <option value="On-Campus">On Campus</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                        <div className="form-group col-md-11">
                          <div>
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px",
                              }}
                            >
                              Location
                            </label>
                          </div>

                          <label
                            style={{
                              fontWeight: "500",
                              fontSize: "13px",
                              marginBottom: "5px",
                            }}
                          >
                            Please enter location
                          </label>
                          <input
                            type="text"
                            id="joblocation"
                            name="joblocation"
                            className="form-control"
                            placeholder="Eg. New York"
                            onChange={(e) => {
                              this.setState({ joblocation: e.target.value });
                            }}
                            required
                          ></input>
                        </div>
                        <div className="col-md-11 d-flex p-0">
                          <div className="form-group col-md-6 ">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px",
                              }}
                            >
                              Salary
                            </label>
                            <input
                              type="number"
                              id="salary"
                              name="salary"
                              className="form-control"
                              placeholder="Eg. 500000"
                              onChange={(e) => {
                                this.setState({ salary: e.target.value });
                              }}
                              required
                            ></input>
                          </div>
                          <div className="form-group col-md-6">
                            <label
                              style={{
                                fontWeight: "bold",
                                marginBottom: "5px",
                              }}
                            >
                              Deadline
                            </label>
                            <input
                              type="date"
                              id="deadline"
                              name="deadline"
                              className="form-control"
                              placeholder="Deadline"
                              onChange={(e) => {
                                this.setState({
                                  deadline: e.target.value,
                                });
                              }}
                              required
                            ></input>
                          </div>
                        </div>
                        <div className="form-group col-md-11">
                          <label
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Description
                          </label>
                          <textarea
                            id="jobdescription"
                            name="jobdescription"
                            className="form-control"
                            placeholder="Enter Job Description"
                            onChange={(e) => {
                              this.setState({ jobdescription: e.target.value });
                            }}
                            required
                          ></textarea>
                        </div>
                        <div className="form-group col-md-8 m-3">
                          <input
                            type="submit"
                            className="btn btn btn-primary"
                          ></input>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="style__jobs___3seWY" style={{ height: "500px" }}>
                {result.getJobs
                  ? result.getJobs.map((i) => (
                      <div key={i.id}>
                        <div
                          className="style__selected___1DMZ3 p-2 mt-3 jobdiv m-1 card"
                          onClick={(e) => {
                            this.setState({ jobobj: i });
                           
                            this.setRedirect(i.id);
                            this.setState({ id: i.id });
                          
                          }}
                        >
                          <div className="d-flex">
                            <ion-icon name="briefcase"></ion-icon>
                            <h3
                              className="ml-2"
                              style={{ fontSize: "16px", fontWeight: "700" }}
                            >
                              {i.job_title}
                            </h3>
                          </div>
                          <h3 style={{ fontSize: "16px", fontWeight: "400" }}>
                            {i ? i.company_name : ""}
                          </h3>
                          <h3
                            style={{
                              color: "rgba(0,0,0,.56)",
                              fontWeight: "200px",
                              fontSize: "14px",
                            }}
                          >
                            {i.job_category} Job
                          </h3>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,

  graphql(addJob, { name: "addJob" }),
  graphql(editInfo, { name: "editInfo" }),

  graphql(getJobs, {
    name: "getJobs",
    options: () => {
      return {
        variables: {
          companyId: localStorage.getItem("loginId"),
        },
      };
    },
  }),
  graphql(getCompany, {
    name: "getCompany",
    options: () => {
      return {
        variables: {
          companyId: localStorage.getItem("loginId"),
        },
      };
    },
  })
)(CompanyHome);
