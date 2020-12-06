const { Student } = require("../db/studentmodel");
const { generateToken, decryptToken } = require("../service/tokenservice");
let addExperience = async (msg) => {
  let response = {};
  let err = {};
  try {
    const tokenuser = await Student.findOne({
      _id: msg.id,
    });

    console.log(tokenuser);

    tokenuser.experiences.push({
      job_title: msg.job_title,
      employer: msg.employer,
      start_time: msg.start_time,
      end_time: msg.end_time,
      location: msg.location,
      description: msg.description,
    });
    const result = await tokenuser.save();
    if (!result) {
      err.status = 500;
      err.data = {
        errors: {
          body: "Server error",
        },
      };
      
    } else {
      return { status: 200, message: "added experience" };
    }
  } catch (err) {
    console.log(err);
    err.status = 500;
    err.data = {
      errors: {
        body: "Server error",
      },
    };
  
  }
};

let editExperience = async (msg) => {
  let response = {};
  let err = {};

  const tokenuser=await Student.findOne({
    _id:msg.id,
  })
    var experiencearr = tokenuser.experiences;
    var updatedExperience = experiencearr.filter(
      (e) => e._id == msg._id
    );
    console.log(updatedExperience);
    var restExperience = experiencearr.filter(
      (e) => e._id != msg._id
    );
    // console.log(restExperience);
    var update = {
      job_title: msg.job_title
        ? msg.job_title
        : updatedExperience.job_title,
      employer: msg.employer
        ? msg.employer
        : updatedExperience.employer,
      start_time: msg.start_time
        ? msg.start_time
        : updatedExperience.start_time,
      end_time: msg.end_time
        ? msg.end_time
        : updatedExperience.end_time,
      location: msg.location
        ? msg.location
        : updatedExperience.location,
      description: msg.description
        ? msg.description
        : updatedExperience.description,
    };

    restExperience.push(update);
    // console.log(restExperience);
    const filter = { _id:msg.id };
    const updatearr = { experiences: restExperience };
    await Student.findOneAndUpdate(filter, updatearr, {
      new: true,
      useFindAndModify: true,
    })
      .then((res1) => {
        (response.data = res1.experiences), (response.status = 201);
        return {status:200,message:"edited done"}
      })

      .catch((err) => {
        console.log(`error getting student basic details ${err}`);
      });
 
};

let deleteExperience = async (msg) => {
  let response = {};
  let err = {};
  console.log("In deleting experience");
  var studentId;
  Decryptedtoken = decryptToken(msg.auth);
  try {
    await Student.findOne({
      emailId: Decryptedtoken.email,
    })
      .then(async (tokenuser) => {
        var filterexperience = tokenuser.experiences.filter(
          (e) => e._id != msg.data.experience.job_id
        );
        console.log(filterexperience);
        const filter = { emailId: Decryptedtoken.email };
        const updatearr = { experiences: filterexperience };
        await Student.findOneAndUpdate(filter, updatearr, {
          new: true,
          useFindAndModify: true,
        }).then((res1) => {
          (response.data = res1.experiences), (response.status = 201);
          return null, response;
        });
      })
      .catch((err) => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err + "error sdsad");

    err.status = 500;
    err.data = {
      errors: {
        body: "cannot delete as record is not present",
      },
    };
    return err, null;
  }
};

exports.deleteExperience = deleteExperience;
exports.editExperience = editExperience;
exports.addExperience = addExperience;
