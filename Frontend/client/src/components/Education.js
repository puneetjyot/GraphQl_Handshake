import React, { Component } from "react";
import "../styles/education.css";
import DatePicker from "react-datepicker";
import api_route from "../app-config";
import { graphql, compose } from "react-apollo";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { getStudent } from "../query/queries";
import { addEducation, editEducation } from "../mutation/mutations";

class Education extends Component {
  state = {
    saveflag: false,
    renderAgain: "",
    startDate: new Date(),
    endDate: new Date(),
    schoolname: "",
    education_level: "",
    major: "",
    minor: "",
    gpa: "",
    educationarr: [],
    editflag: false,
    editId: "",
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  editSchool = async (editid) => {
    let mutationResponse = await this.props.editEducation({
      variables: {
        _id: editid,
        id: localStorage.getItem("loginId"),
        school_name: this.state.schoolname,
        educationlevel: this.state.education_level,
        major: this.state.major,
        minor: this.state.minor,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        gpa: this.state.gpa,
      },
      refetchQueries: [
        {
          query: getStudent,
          variables: { studentId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.editEducation;
    if (response) {
      this.setState({ editflag: false });
      console.log(response);

      if (response.status === "200") {
        this.setState({
          newName: response,
        });
      } else {
        this.setState({
          message: response.message,
          loginFlag: true,
        });
      }
    }
  };

  addSchool = async () => {
    let mutationResponse = await this.props.addEducation({
      variables: {
        id: localStorage.getItem("loginId"),
        school_name: this.state.schoolname,
        educationlevel: this.state.education_level,
        major: this.state.major,
        minor: this.state.minor,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        gpa: this.state.gpa,
      },
      refetchQueries: [
        {
          query: getStudent,
          variables: { studentId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.addEducation;
    if (response) {
      this.setState({ saveflag: false });
      console.log(response);
      // this.setState({journeyvalue:response.career_objective})

      if (response.status === "200") {
        this.setState({
          newName: response,
        });
      } else {
        this.setState({
          message: response.message,
          loginFlag: true,
        });
      }
    }
  };

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };
  render() {
    const show = this.state.saveflag ? "show" : "";
    const showbutton = this.state.saveflag ? "" : "show";

    const showedit = this.state.editflag ? "show" : "";
    const showeditbutton = this.state.editflag ? "" : "show";
    // console.log(this.props.educationData.student.education[0])
    return (
      <div class="card">
        <div class="card-body d-flex">
          <div className="style__default-icon___2cQoZ mt-4 m-4">
            <span>
              <ion-icon name="school"></ion-icon>
            </span>
          </div>
          <div className="col-10">
            <h4
              className="card-title"
              style={{ fontSize: "18px", fontWeight: "500" }}
            >
              Education
            </h4>

            {this.props.educationData
              ? this.props.educationData.educations.map((i) => (
                  <div className="mb-4" key={i._id}>
                    <div className="d-flex justify-content-between ">
                      <div>
                        <h6
                          className="card-subtitle mb-2 "
                          style={{ fontSize: "18px", fontWeight: "500" }}
                        >
                          {i.school_name}
                        </h6>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            console.log("editing", i._id);
                            this.setState({ editflag: true });
                            this.setState({ editId: i._id });
                          }}
                          className={
                            "collapse navbar-collapse " + showeditbutton
                          }
                        >
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </div>
                    </div>
                    <h6
                      class="card-subtitle mb-2 text-muted "
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      {i.education_level}
                    </h6>
                    <h6 style={{ fontSize: "13px, fontWeight:300px" }}>
                      {/* Jan 2020 - present */}
                      {i.GPAboolean
                        ? `${i.start_time} - Present`
                        : `${i.start_time} - ${i.end_time}`}
                    </h6>
                    <h6 style={{ fontSize: "13px, fontWeight:300px" }}>
                      {`Major in ${i.major}`}
                    </h6>
                    <h6
                      style={{ fontSize: "13px, fontWeight:300px" }}
                    >{`GPA - ${i.gpa}`}</h6>

                    <div>
                      {this.state.editflag && this.state.editId == i._id ? (
                        <div className={"collapse navbar-collapse " + showedit}>
                          <div className="mt-4 d-flex">
                            <div className="style__default-icon___2cQoZ mt-4 m-2">
                              <span>
                                <ion-icon name="school"></ion-icon>
                              </span>
                            </div>
                            <div>
                              <label
                                htmlFor="school"
                                class="control-label mt-4"
                                style={{ fontSize: "bold" }}
                              >
                                School Name
                              </label>
                            </div>
                          </div>
                          <div className=" ml-5 mr-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={i.school_name}
                              name="newschoolname"
                              onChange={(e) => {
                                this.setState({ schoolname: e.target.value });
                              }}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="education_level"
                              class="control-label mt-2 ml-5"
                              style={{ fontSize: "bold" }}
                            >
                              Education Level
                            </label>
                          </div>
                          <div className=" ml-5 mr-3">
                            <input
                              type="text"
                              className="form-control"
                              name="neweducationlevel"
                              placeholder={i.education_level}
                              onChange={(e) => {
                                this.setState({
                                  education_level: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label
                              for="timeperiod"
                              className="control-label mt-3 ml-4"
                              style={{ fontSize: "bold" }}
                            >
                              Time Period
                            </label>
                          </div>
                          <div className="d-flex">
                            <div className="col-6">
                              <div>
                                <label
                                  for="school"
                                  className="control-label mt-2 ml-4"
                                  style={{ fontSize: "bold" }}
                                >
                                  Start Date
                                </label>
                              </div>
                              <div>
                                <DatePicker
                                  className="ml-5 "
                                  selected={this.state.startDate}
                                  onChange={this.handleStartDateChange}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div>
                                <label
                                  for="endDate"
                                  className="control-label mt-2 ml-4"
                                  style={{ fontSize: "bold" }}
                                >
                                  End Date
                                </label>
                              </div>
                              <div>
                                <DatePicker
                                  className="ml-5 "
                                  selected={this.state.endDate}
                                  onChange={this.handleEndDateChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label
                              for="major"
                              class="control-label mt-2 ml-5"
                              style={{ fontSize: "bold" }}
                            >
                              Major
                            </label>
                          </div>
                          <div className=" ml-5 mr-3">
                            <input
                              type="text"
                              className="form-control"
                              name="newmajor"
                              placeholder={i.major}
                              onChange={(e) => {
                                this.setState({ major: e.target.value });
                              }}
                            />
                          </div>
                          <div>
                            <label
                              for="minor"
                              class="control-label mt-2 ml-5"
                              style={{ fontSize: "bold" }}
                            >
                              Minor
                            </label>
                          </div>
                          <div className=" ml-5 mr-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={i.minor ? i.minor : ""}
                              name="newminor"
                              onChange={(e) => {
                                this.setState({ minor: e.target.value });
                              }}
                            />
                          </div>
                          <div>
                            <label
                              for="gpa"
                              class="control-label mt-2 ml-5"
                              style={{ fontSize: "bold" }}
                            >
                              GPA
                            </label>
                          </div>
                          <div className=" ml-5 mr-3">
                            <input
                              type="text"
                              className="form-control"
                              name="newgpa"
                              placeholder={i.GPA}
                              onChange={(e) => {
                                this.setState({ gpa: e.target.value });
                              }}
                            />
                          </div>
                          <div align="right" className="d-flex ml-5 m-3">
                            <button
                              className="btn btn-danger mr-2"
                              type="button"
                              onClick={(e) => {
                                this.setState({ editflag: false });
                                this.deleteSchool(i.education_id);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success "
                              type="button"
                              onClick={(e) => {
                                this.setState({ editflag: false });
                                this.editSchool(i._id);
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
                ))
              : ""}
          </div>
        </div>

        <div class="card-footer" align="center">
          <div className={"collapse navbar-collapse " + showbutton}>
            <button
              className="btn btn btn-active form-control"
              style={{ color: "#1569e0", fontSize: "13px" }}
              onClick={(e) => {
                this.setState({ saveflag: true });
              }}
            >
              Add School
            </button>
          </div>
        </div>
        <div className={"collapse navbar-collapse " + show}>
          <div className="mt-4 d-flex">
            <div className="style__default-icon___2cQoZ mt-4 m-2">
              <span>
                <ion-icon name="school"></ion-icon>
              </span>
            </div>
            <div>
              <label
                htmlFor="school"
                class="control-label mt-4"
                style={{ fontSize: "bold" }}
              >
                School Name
              </label>
              {/* <textarea className="form-control" rows='2' name="newschoolname" type='textarea'></textarea
          > */}
            </div>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newschoolname"
              onChange={(e) => {
                this.setState({ schoolname: e.target.value });
              }}
            />
          </div>

          <div>
            <label
              htmlFor="school"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Education Level
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="neweducationlevel"
              onChange={(e) => {
                this.setState({ education_level: e.target.value });
              }}
            />
          </div>
          <div>
            <label
              for="timeperiod"
              className="control-label mt-3 ml-4"
              style={{ fontSize: "bold" }}
            >
              Time Period
            </label>
          </div>
          <div className="d-flex">
            <div className="col-6">
              <div>
                <label
                  for="school"
                  className="control-label mt-2 ml-4"
                  style={{ fontSize: "bold" }}
                >
                  Start Date
                </label>
              </div>
              <div>
                <DatePicker
                  className="ml-5 "
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label
                  for="endDate"
                  className="control-label mt-2 ml-4"
                  style={{ fontSize: "bold" }}
                >
                  End Date
                </label>
              </div>
              <div>
                <DatePicker
                  className="ml-5 "
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label
              for="major"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Major
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newmajor"
              onChange={(e) => {
                this.setState({ major: e.target.value });
              }}
            />
          </div>
          <div>
            <label
              for="minor"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Minor
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newminor"
              onChange={(e) => {
                this.setState({ minor: e.target.value });
              }}
            />
          </div>
          <div>
            <label
              for="gpa"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              GPA
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newgpa"
              onChange={(e) => {
                this.setState({ gpa: e.target.value });
              }}
            />
          </div>
          <div align="right" className="d-flex ml-5 m-3">
            <button
              className="btn btn-light mr-2"
              type="button"
              onClick={(e) => {
                this.setState({ saveflag: false });
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-success "
              type="button"
              onClick={(e) => {
                this.setState({ saveflag: false });
                this.addSchool();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getStudent, {
    options: {
      variables: { studentId: localStorage.getItem("loginId") },
    },
  }),
  graphql(addEducation, { name: "addEducation" }),
  graphql(editEducation, { name: "editEducation" })
)(Education);
