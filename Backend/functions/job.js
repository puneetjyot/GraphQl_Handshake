const { Student } = require("../db/studentmodel");
const { generateToken, decryptToken } = require("../service/tokenservice");
const { Company, Job } = require("../db/comapnymodel");
const { StudentJobs } = require("../db/jobmodel");

let addJob = async (msg) => {
  let response = {};
  let err = {};
  console.log("----------adding jobs");
  var companyId, name;
  try {
    const tokenuser = await Company.findOne({
      _id: msg.company_id,
    });

    if (tokenuser) {
      companyId = tokenuser._id;
      email = tokenuser.emailId;
      name = tokenuser.company_name;
    } else {
      err.status = 403;
      err.data = {
        errors: {
          message: "unauthenticated user",
        },
      };
      return err, null;
    }

    const result = await Job.create({
      job_title: msg.job_title,
      deadline: msg.deadline,
      location: msg.location,
      salary: msg.salary,
      job_description: msg.job_description,
      job_category: msg.job_category,
      company_id: companyId,
      company_name: name,
    });

    return { status: 200, message: "Added Job" };
  } catch (error) {
    console.log(error);
  }
};

let getStudentByJob = async (msg) => {
  let response = {};
  let err = {};
  console.log("----------getting all students");
  Decryptedtoken = decryptToken(msg.auth);
  try {
    await Company.findOne({
      emailId: Decryptedtoken.email,
    })
      .then((tokenuser) => {
        if (tokenuser) {
          studentId = tokenuser.company_basic_detail_id;
          email = tokenuser.emailId;
          name = tokenuser.company_name;
        } else {
          err.status = 403;
          err.data = {
            errors: {
              err: "unauthenticated user",
            },
          };
          return err, null;
        }
      })
      .catch((err) => {
        console.log(`getting students who applied for this job ${err}`);
      });
    var finalarray = [];
    await StudentJobs.find({
      job_id: msg.id,
    })
      .populate("student_id")
      .then((tokenuser) => {
        if (tokenuser) {
          // console.log(tokenuser)
          tokenuser.map((t) => {
            finalusereducation = t.student_id.educations.filter(
              (e) => e.isPrimary == 1
            );
            // console.log(finalusereducation)
            t.student_id.educations = finalusereducation;
            // console.log(t);
            finalarray.push(t);
          });
          // console.log(finalarray);
        }
        let result = {
          success: true,
          msg: "Successfully fetched student profile",
          msgDesc: finalarray,
        };
        (response.data = result), (response.status = 201);
        return null, response;
      });
  } catch (err) {
    console.log(`error getting jobs ${err}`);
    err.status = 500;
    err.data = {
      errors: {
        body: err,
      },
    };
    return err, null;
  }
};
let appliedJobs = async (msg) => {
  let response = {};
  let err = {};

  console.log("----------getting applied jobs");
  Decryptedtoken = decryptToken(msg.auth);
  var studentId;
  var { page, limit } = msg.query;
  console.log(parseInt(page, 10));
  var options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
    populate: "job_id",
  };
  try {
    var whereCondition = {};
    if (msg.statusFilter !== "empty") {
      whereCondition = {
        ...whereCondition,
        status: msg.statusFilter,
      };
    }

    await Student.findOne({
      emailId: Decryptedtoken.email,
    })
      .then((tokenuser) => {
        console.log(
          tokenuser.student_basic_detail_id +
            "in details ------------------------"
        );
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.name;
      })
      .catch((err) => {
        console.log(`applying for jobs ${err}`);
      });

    const jobsAppliedArr = await StudentJobs.paginate(
      {
        student_basic_detail_id: studentId,
        ...whereCondition,
      },
      options
    ).then((finalarray) => {
      console.log("sending jobs-----------------" + finalarray);
      let jobdata = {
        result: finalarray.docs,
        total: finalarray.total,
      };
      (response.data = jobdata), (response.status = 201);
      return null, response;
    });
  } catch (err) {
    console.log(`error getting jobs ${err}`);
    err.status = 403;
    err.data = {
      errors: {
        body: "unable to get applied jobs",
      },
    };
    return err, null;
  }
};

let getJobs = async (msg) => {
  let response = {};
  let err = {};
  console.log("----------getting jobs");
  Decryptedtoken = decryptToken(msg.auth);
  var sort = "";
  var whereCondition = {};
  if (msg.categoryFilter !== "empty") {
    whereCondition = {
      ...whereCondition,
      job_category: msg.categoryFilter,
    };
  }
  if (msg.companyFilter !== "empty") {
    console.log("inside if clause for company_fiiilter");
    whereCondition = {
      ...whereCondition,
      $or: [
        {
          company_name: { $regex: new RegExp(msg.companyFilter, "i") },
        },
        { job_title: { $regex: new RegExp(msg.companyFilter, "i") } },
      ],
    };
  }

  if (msg.locationFilter !== "empty") {
    whereCondition = {
      ...whereCondition,
      location: { $regex: new RegExp(msg.locationFilter, "i") },
    };
  }
  if (msg.sortFilter !== "empty") {
    console.log("inside sorting" + msg.sortFilter);
    console.log(sort);
    switch (msg.sortFilter) {
      case "DeadlineAsc": {
        sort = {
          deadline: 1,
        };
        break;
      }
      case "DeadlineDesc": {
        console.log("in descending");
        sort = "";
        sort = {
          deadline: -1,
        };
        break;
      }
      case "LocationAsc": {
        console.log("in location");
        sort = {
          location: 1,
        };
        break;
      }
      case "LocationDesc": {
        console.log("in location");
        sort = {
          location: -1,
        };
        break;
      }
      case "PostedonAsc": {
        console.log("in posting");
        sort = {
          createdAt: 1,
        };
        break;
      }
      case "PostedonDesc": {
        console.log("in posting");
        sort = {
          createdAt: -1,
        };
        break;
      }
      default: {
        sort = {
          deadline: 1,
        };
        break;
      }
    }
  }
  console.log(sort);

  try {
    await Student.findOne({
      emailId: Decryptedtoken.email,
    })
      .then((tokenuser) => {
        console.log(
          tokenuser.student_basic_detail_id +
            "in details ------------------------"
        );
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.name;
      })
      .catch((err) => {
        console.log(`error posting student journey ${err}`);
      });
    var { page, limit } = msg.query;
    console.log(parseInt(page, 10));
    var options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: sort,
    };

    const result = await Job.paginate(whereCondition, options);
    console.log("sending jobs-----------------" + result);

    // res.status(201).send({
    //   result: result.docs,
    //   total:result.total,
    //   pages:result.pages
    // });

    let jobdata = {
      result: result.docs,
      total: result.total,
      pages: result.pages,
    };
    (response.data = jobdata), (response.status = 201);
    return null, response;
  } catch (error) {
    console.log(`error getting jobs ${error}`);
    err.status = 403;
    err.data = {
      errors: {
        message: error,
      },
    };
    return err, null;
  }
};

let applyJob = async (msg) => {
  try {
  
    const result = await StudentJobs.create({
      job_id: msg.job_id,
      status: "Pending",
      student_id: msg.student_id,
    });
    if (result) {
      console.log(result)
      return { status: 200, message: "applied jobs" };
    }
  } catch (error) {
    return { status: 500, message: "already applied" };
  }
};

exports.applyJob = applyJob;

exports.getJobs = getJobs;
exports.appliedJobs = appliedJobs;
exports.getStudentByJob = getStudentByJob;
exports.addJob = addJob;
