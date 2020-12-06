import React, { Component } from "react";
import "../styles/experience.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import api_route from "../app-config";
import { addExperience, editExperience } from "../mutation/mutations";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import { getStudent } from "../query/queries";

class Experience extends Component {
  state = {
    saveflag: false,

    experiencearr: [],
    job_title: "",
    employer: "",
    start_time: new Date(),
    end_time: new Date(),
    location: "",
    description: "",
  };
  handleStartDateChange = (date) => {
    this.setState({
      start_time: date,
    });
  };
  handleEndDateChange = (date) => {
    this.setState({
      end_time: date,
    });
  };

  isNull(value) {
    var val = value ? value : " ";
    return val;
  }
  editExperience = async (editid) => {
    let mutationResponse = await this.props.editExperience({
      variables: {
        id: localStorage.getItem("loginId"),
        _id: editid,
        job_title: this.state.job_title,
        employer: this.state.employer,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        location: this.state.location,
        description: this.state.description,
      },
      refetchQueries: [
        {
          query: getStudent,
          variables: { studentId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.editExperience;
    if (response) {
      this.setState({ saveflag: false });
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

  addExperience = async () => {
    let mutationResponse = await this.props.addExperience({
      variables: {
        id: localStorage.getItem("loginId"),
        job_title: this.state.job_title,
        employer: this.state.employer,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        location: this.state.location,
        description: this.state.description,
      },
      refetchQueries: [
        {
          query: getStudent,
          variables: { studentId: localStorage.getItem("loginId") },
        },
      ],
    });
    let response = mutationResponse.data.addExperience;
    if (response) {
      this.setState({ saveflag: false });
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

  render() {
    const show = this.state.saveflag ? "show" : "";
    const showbutton = this.state.saveflag ? "" : "show";
    const showedit = this.state.editflag ? "show" : "";
    const showeditbutton = this.state.editflag ? "" : "show";

    return (
      <div class="card">
        <div class="card-body col-12">
          <h4
            class="card-title"
            style={{ fontSize: "18px", fontWeight: "500" }}
          >
            Work & Volunteer Experience
          </h4>
          {this.props.experienceData
            ? this.props.experienceData.experiences.map((i) => (
                <div key={i._id}>
                  <div className="d-flex">
                    <div className="style__default-icon___2cQoZ mt-4 m-4">
                      <span>
                        <ion-icon name="briefcase"></ion-icon>
                      </span>
                    </div>
                    <div className="m-4">
                      <div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "500" }}
                            >
                              {i.employer}
                            </span>
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
                        <h4 style={{ fontSize: "16px" }}>{i.job_title}</h4>
                        <h6 style={{ fontSize: "13px" }}>
                          {i.still_working_boolean
                            ? `${i.start_time} - Present`
                            : `${i.start_time} - ${i.end_time}`}
                        </h6>
                        <h6 style={{ fontSize: "13px" }}>{i.location}</h6>
                        <h6 style={{ fontSize: "13px" }}>{i.description}</h6>
                      </div>
                    </div>
                  </div>
                  <div>
                    {this.state.editflag && this.state.editId == i._id ? (
                      <div className={"collapse navbar-collapse " + showedit}>
                        <div className="mt-4 d-flex">
                          <div className="style__default-icon___2cQoZ mt-4 m-2">
                            <span>
                              <ion-icon name="briefcase"></ion-icon>
                            </span>
                          </div>
                          <div>
                            <label
                              htmlFor="school"
                              class="control-label mt-4"
                              style={{ fontSize: "bold" }}
                            >
                              Job Title
                            </label>
                          </div>
                        </div>
                        <div className=" ml-5 mr-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={i.job_title}
                            name="jobtitle"
                            onChange={(e) => {
                              this.setState({ job_title: e.target.value });
                            }}
                          />
                        </div>
                        <div>
                          <label
                            for="employer"
                            class="control-label mt-2 ml-5"
                            style={{ fontSize: "bold" }}
                          >
                            Employer
                          </label>
                        </div>
                        <div className=" ml-5 mr-3">
                          <input
                            type="text"
                            className="form-control"
                            name="newemployer"
                            onChange={(e) =>
                              this.setState({ employer: e.target.value })
                            }
                            placeholder={i.employer}
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
                                for="startdate"
                                className="control-label mt-2 ml-4"
                                style={{ fontSize: "bold" }}
                              >
                                Start Date
                              </label>
                            </div>
                            <div>
                              <DatePicker
                                className="ml-5 "
                                selected={this.state.start_time}
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
                                selected={this.state.end_time}
                                onChange={this.handleEndDateChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            for="location"
                            class="control-label mt-2 ml-5"
                            style={{ fontSize: "bold" }}
                          >
                            Location
                          </label>
                        </div>
                        <div className=" ml-5 mr-3">
                          <input
                            type="text"
                            className="form-control"
                            name="newlocation"
                            onChange={(e) =>
                              this.setState({ location: e.target.value })
                            }
                            placeholder={i.location}
                          />
                        </div>
                        <div>
                          <label
                            for="description"
                            class="control-label mt-2 ml-5"
                            style={{ fontSize: "bold" }}
                          >
                            Description
                          </label>
                        </div>
                        <div className=" ml-5 mr-3">
                          <textarea
                            type="text"
                            className="form-control"
                            name="newdescription"
                            rows="4"
                            placeholder={i.description}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </div>

                        <div align="right" className="d-flex ml-5 m-3">
                          <button
                            className="btn btn-danger mr-2"
                            type="button"
                            onClick={(e) => {
                              this.setState({ editflag: false });
                              this.deleteExperience(i._id);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-success "
                            type="button"
                            onClick={(e) => {
                              this.setState({ editflag: false });
                              this.editExperience(i._id);
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

        <div class="card-footer" align="center">
          <div className={"collapse navbar-collapse " + showbutton}>
            <button
              className="btn btn btn-active"
              onClick={(e) => {
                this.setState({ saveflag: true });
              }}
              style={{ color: "#1569e0", fontSize: "13px" }}
            >
              Add Experience
            </button>
          </div>
        </div>
        <div className={"collapse navbar-collapse " + show}>
          <div className="mt-4 d-flex">
            <div className="style__default-icon___2cQoZ mt-4 m-2">
              <span>
                <ion-icon name="briefcase"></ion-icon>
              </span>
            </div>
            <div>
              <label
                for="jobtitle"
                class="control-label mt-4"
                style={{ fontSize: "bold" }}
              >
                Job Title
              </label>
            </div>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newjobtitle"
              onChange={(e) => this.setState({ job_title: e.target.value })}
            />
          </div>

          <div>
            <label
              for="employer"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Employer
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newemployer"
              onChange={(e) => this.setState({ employer: e.target.value })}
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
                  for="startdate"
                  className="control-label mt-2 ml-4"
                  style={{ fontSize: "bold" }}
                >
                  Start Date
                </label>
              </div>
              <div>
                <DatePicker
                  className="ml-5 "
                  selected={this.state.start_time}
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
                  selected={this.state.end_time}
                  onChange={this.handleEndDateChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label
              for="location"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Location
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <input
              type="text"
              className="form-control"
              name="newlocation"
              onChange={(e) => this.setState({ location: e.target.value })}
            />
          </div>
          <div>
            <label
              for="description"
              class="control-label mt-2 ml-5"
              style={{ fontSize: "bold" }}
            >
              Description
            </label>
          </div>
          <div className=" ml-5 mr-3">
            <textarea
              type="text"
              className="form-control"
              name="newdescription"
              rows="4"
              onChange={(e) => this.setState({ description: e.target.value })}
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
              onClick={(e) => {
                this.setState({ saveflag: false });
                this.addExperience();
              }}
              type="button"
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
  graphql(addExperience, { name: "addExperience" }),
  graphql(editExperience, { name: "editExperience" })
)(Experience);
