const { Student } = require("../db/studentmodel");
const { Company } = require("../db/comapnymodel");
const bcrypt = require("bcrypt");
const passwordHash = require('password-hash');
const { generateToken, decryptToken } = require("../service/tokenservice");
const { generateUUID } = require("../service/uuidservice");
let studentRegister = async (msg) => {
  let response = {};
  let error = {};

  const studentid = await generateUUID();
  const studenttoken = await generateToken(msg.email);
  console.log(msg.email);

  try {
    const registerStudent = await Student.create({
      emailId: msg.email,
      password: passwordHash.generate(msg.password),
      student_basic_detail_id: studentid,
      name: msg.name,
      college: msg.college,
    });
    console.log(msg.name);

    let data = {
      user: {
        email: registerStudent.email,
        name: registerStudent.name,
        image: null,
        token: studenttoken,
        isRegister: true,
        resp: registerStudent,
      },
    };

    return { status: 200, message: studenttoken,loginId:registerStudent._id };
  } catch (err) {
    console.log(err);
    error.status = 401;
    error.data = {
      errors: {
        body: err,
      },
    };

    return { status: 500, message: "error while registering" };
  }
};

let companyRegister = async (msg) => {
  let response = {};
  let err = {};

  const companyid = await generateUUID();
  const companytoken = await generateToken(msg.email);
  console.log(msg);

  try {
    const registerCompany = await Company.create({
      emailId: msg.email,
      password: passwordHash.generate(msg.password),
      company_basic_detail_id: companyid,
      company_name: msg.company_name,
      location: msg.location,
      phone: msg.phone,
    });
    console.log(registerCompany);

    let data = {
      company: {
        email: registerCompany.email,
        company_name: registerCompany.company_name,
        image: null,
        token: companytoken,
        res: registerCompany,
      },
    };
    response.data = data;
    response.status = 201;
    console.log("not in error");
    return { status: 201, message: companytoken,loginId:registerCompany._id };

  } catch (error) {
    console.log("in error" + error);
    err.data = {
      errors: {
        body: error,
      },
    };
    err.status = 403;
  }
  return { status: 500, message: "error while registering" };
};

exports.companyRegister = companyRegister;
exports.studentRegister = studentRegister;
