const { Student } = require("../db/studentmodel");
const { generateToken, decryptToken } = require("../service/tokenservice");
let addEducation = async (msg) => {
  let response = {};
  let err = {};
  console.log("In adding education");
  try {
    const tokenuser = await Student.findOne({
      _id: msg.id
    });
    console.log(msg)
    if (tokenuser) {
      tokenuser.educations.push({
        school_name: msg.school_name,
        education_level: msg.education_level,
        major: msg.major,
        minor: msg.minor ? msg.minor : "",
        start_time: msg.start_time,
        end_time: msg.end_time,
        gpa: msg.gpa
        
      });
   const result=  await tokenuser.save();
     
        if (!result) {
          console.log("in error")
          err.status = 500;
          err.data = {
            errors: {
              body: "Unable to add school",
            },
          };
          return err, null;
        } else {
          console.log("success")
          // let data = {
          //   educations: tokenuser.educations,
          // };
          // (response.data = data.educations), (response.status = 201);
          return {status:200,message:"Added Education"};
        }
     
    } else {
      err.status = 403;
      err.data = {
        errors: {
          body: "Unauthenticated user",
        },
      };
      return err, null;
    }
  } catch (error) {
    console.log(error+"error");
    err.status = 403;
    err.data = {
      errors: {
        body: "Unauthenticated user",
      },
    };
    return err, null;
  }
};

let editEducation = async (msg) => {
  let response = {};
  let err = {};
  console.log("In updating education");
  var studentId;
  try {
    
    const preeducation = await Student.findOne({
      _id:msg.id
    });
  
    // var doc=preeducation.educations._id(msg.education.educationId)
    var educationarr = preeducation.educations;
    filteredEducation = educationarr.filter(
      (e) => e._id == msg._id
    );
    restEducation = educationarr.filter(
      (e) => e._id !=msg._id
    );
    console.log("filtered=> " + filteredEducation);
    console.log(restEducation);

    const update = {
      school_name: msg.school_name
        ? msg.school_name
        : filteredEducation.school_name,
      education_level: msg.education_level
        ? msg.education_level
        : filteredEducation.education_level,
      major: msg.major
        ? msg.major
        : filteredEducation.major,
      minor: msg.minor ? msg.minor : "",
      start_time: msg.start_time
        ? msg.start_time
        : filteredEducation.start_time,
      end_time: msg.end_time
        ? msg.end_time
        : filteredEducation.end_time,
      gpa: msg.gpa ? msg.gpa : filteredEducation.gpa,
      
    };

    restEducation.push(update);
    console.log(restEducation);

    const filter = { _id: msg.id };
    const updatearr = { educations: restEducation };
    const res1= await Student.findOneAndUpdate(filter, updatearr, {
      new: true,
      useFindAndModify: true,
    })
      let data = {
        educations: res1.educations,
      };
      (response.data = data.educations), (response.status = 201);
      return {status:200,message:"Education edited"}
  
  } catch (err) {
    console.log(err);
    err.status = 403;
    err.data = {
      errors: {
        body: "Unauthenticated user",
      },
    };
    return err, null;
  }
};

exports.editEducation = editEducation;

exports.addEducation = addEducation;
