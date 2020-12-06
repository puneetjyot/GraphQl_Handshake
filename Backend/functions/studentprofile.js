const { Student } = require("../db/studentmodel");
const { generateToken, decryptToken } = require("../service/tokenservice");

let updateName = async (msg) => {
  let response = {};
  let err = {};
  console.log("In updating name");

  try {
    const filter = { _id: msg.id };
    const update = { name: msg.name };

    const student = await Student.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
    // .then(tokenuser => {
    //   console.log(tokenuser)
    //   return {
    //     name: tokenuser.name,
    //     status: 200,
    //   };
    // response.data=data,response.status=201
    // return (null, response);

    return {
      name: student.name,
      status: 200,
    };
  } catch (error) {
    err.status = 401;
    err.data = {
      errors: {
        body: error,
      },
    };
    return err, null;
  }
};

let updateJourney = async (msg) => {
  let response = {};
  let err = {};
  console.log("getting journey");

  try {
    const filter = { _id: msg.id };
    const update = { career_objective: msg.career_objective };
    const tokenuser = await Student.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });

   
    if (tokenuser) {
      console.log(tokenuser);
      return {
        career_objective: tokenuser.career_objective,
        status: 200,
      };
    } else {
      err.status = 401;
      err.data = {
        errors: {
          body: "Unauthenticated User",
        },
      };
      return err, null;
    }
  } catch (err) {
    console.log(`error posting student journey ${err}`);
    err.status = 401;
    err.data = {
      errors: {
        body: err,
      },
    };
    return err, null;
  }
};

let updateBasicDetail = async (msg) => {
  let response = {};
  let err = {};
  console.log(msg);

  try {
    const tokenuser = await Student.findOne({
      _id: msg._id,
    });

    const filter = { _id: msg.id };

    const result = await Student.findOneAndUpdate(
      filter,

      {
        dob: msg.dob ? msg.dob : tokenuser.dob,
        studentstate: msg.studentstate
          ? msg.studentstate
          : tokenuser.studentstate,
        city: msg.city ? msg.city : tokenuser.city,
        country: msg.country ? msg.country : tokenuser.country,
        emailId: msg.emailId ? msg.emailId : tokenuser.emailId,
        phone: msg.phone ? msg.phone : tokenuser.phone,
      },
      { new: true, useFindAndModify: true }
    );

    return {
      name: result.dob,
      studentstate: result.studentstate,
      city: result.city,
      country: result.country,
      phone: result.phone,
      emailId: result.emailId,
      dob: result.dob,
      status: 200,
    };
  } catch (err) {
    console.log(`error posting student journey ${err}`);
    err.status = 500;
    err.data = {
      errors: {
        body: "Server error",
      },
    };
    return err, null;
  }
};

exports.updateBasicDetail = updateBasicDetail;
exports.updateJourney = updateJourney;
exports.updateName = updateName;
