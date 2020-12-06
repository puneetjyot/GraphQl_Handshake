const { Student } = require("../db/studentmodel");
const { Company } = require("../db/comapnymodel");
const passwordHash = require("password-hash");
const bcrypt = require("bcrypt");
const { generateToken, decryptToken } = require("../service/tokenservice");
let studentLogin = async (msg) => {
  let response = {};
  let err = {};

  console.log(msg.email);
  console.log("In login");

  const studenttoken = await generateToken(msg.email);
  try {
    const student = await Student.findOne({
      emailId: msg.email,
    });
    // console.log(student)
    if (student) {
      console.log(msg.password)
      if (passwordHash.verify(msg.password, student.password))
        console.log("logged in");
      console.log(student);
      let data = {
        user: {
          emailId: student.email,
          name: student.name,
          image: null,
          token: studenttoken,
          resp: student,
          isLogin: true,
        },
      };
      return { status: 200, message: studenttoken,loginId:student._id };
    } else {
      return { status: 401, message: "INCORRECT_PASSWORD" };
    }
  } catch (err) {
    return { status: 500, message: err.data };
  }
};

let companyLogin = async (msg) => {
  let response = {};
  let err = {};

  console.log(msg.email);
  console.log("In login");

  const companytoken = await generateToken(msg.email);
  try {
    const company = await Company.findOne({
      emailId: msg.email,
    });

    if (company) {
      console.log(passwordHash.verify(msg.password, company.password))
      if (passwordHash.verify(msg.password, company.password)){
      let data = {
        user: {
          emailId: company.email,
          name: company.name,
          image: null,
          token: companytoken,
          resp: company,
          isLogin: true,
        },
      };
      return { status: 200, message: companytoken,loginId:company._id };
    }
    } else {

      err.status = 401;
      err.data = {
        errors: {
          body: "Unauthorised User",
        },
      };
      return { status: 401, message: "INCORRECT_PASSWORD" };
    }
  } catch (err) {
    console.log(err)
    err.status = 500;
    err.data = {
      errors: {
        body: err,
      },
    };
    return { status: 401, message: "INCORRECT_PASSWORD" };
  }
};

exports.companyLogin = companyLogin;
exports.studentLogin = studentLogin;
