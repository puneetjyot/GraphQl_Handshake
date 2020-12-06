const { Student } = require("../../db/studentmodel");
const { generateToken, decryptToken } = require("../../service/tokenservice");
let getAllStudents = async (msg) => {
  let response = {};
  let err = {};

  console.log("----------getting all profiles");


  try{

    



  }
  catch(error)
  {
    console.log(error)
  }

}


 // Decryptedtoken = decryptToken(msg.auth);
  // var { page, limit } = msg.query;
  //console.log(parseInt(page, 10));
  // var options = {
  //   page: parseInt(page, 10) || 1,
  //   limit: parseInt(limit, 10) || 10,
  //   sort: {
  //     name: 1,
  //   },
  // };
  // if (
  //   msg.studentnameFilter == "empty" &&
  //   msg.majorFilter == "empty" &&
  //   msg.skillFilter == "empty" &&
  //   msg.collegeFilter == "empty"
  // ) {
    // try {
    //  const tokenuser= await Student.findOne({
    //     emailId: Decryptedtoken.email,
    //   })
    //     .then((tokenuser) => {
    //       console.log(
    //         tokenuser.student_basic_detail_id +
    //           "in details ------------------------"
    //       );
    //       studentId = tokenuser.student_basic_detail_id;
    //       email = tokenuser.emailId;
    //       name = tokenuser.name;
    //     })
    //     .catch((err) => {
    //       console.log(`error posting student journey ${err}`);
    //     });
    //   var aggregate = Student.aggregate([
    //     { $unwind: "$educations" },
    //     { $match: { "educations.isPrimary": "1" } },
    //   ]);
    //   const studentarr = await Student.aggregatePaginate(aggregate);
    //   console.log(studentarr);
    //   var newStudentarr = [];
    //   var totalDocs = studentarr.totalDocs;
    //   studentarr.docs.map((e) => {
    //     var skillArr = e.skills;
    //     var skillcommaseperated = "";
    //     skillArr.map((skill) => {
    //       skillcommaseperated
    //         ? (skillcommaseperated =
    //             skillcommaseperated + "," + skill.skill_name)
    //         : (skillcommaseperated = skill.skill_name);
    //     });
    //     newStudent = { ...e, skills: skillcommaseperated };
    //     // newStudent.totalDocs=totalDocs;
    //     console.log(newStudent);
    //     newStudentarr.push(newStudent);
    //   });
    //   // newStudentarr.totalDocs=totalDocs;
    //   //
    //   let result = {
    //     newStudentarr,
    //     total: totalDocs,
    //   };
    //   (response.data = result), (response.status = 201);
    //   return null, response;
    // } catch (err) {
    //   console.log(`error getting jobs ${err}`);
    //   err.status = 403;
    //   err.data = {
    //     errors: {
    //       body: err,
    //     },
    //   };
    //   return err, null;
    // }
  // } else {
  //   try {
  //     await Student.findOne({
  //       emailId: Decryptedtoken.email,
  //     })
  //       .then((tokenuser) => {
  //         console.log(
  //           tokenuser.student_basic_detail_id +
  //             "in details ------------------------"
  //         );
  //         studentId = tokenuser.student_basic_detail_id;
  //         email = tokenuser.emailId;
  //         name = tokenuser.name;
  //       })
  //       .catch((err) => {
  //         console.log(`error posting student journey ${err}`);
  //       });
  //     console.log(msg.studentnameFilter);
  //     var aggregate = Student.aggregate([
  //       { $unwind: "$educations" },
  //       {
  //         $match: {
  //           "educations.isPrimary": "1",
  //           $or: [
  //             {
  //               name: {
  //                 $regex: new RegExp(msg.studentnameFilter, "i"),
  //               },
  //             },
  //             {
  //               college: {
  //                 $regex: new RegExp(msg.collegeFilter, "i"),
  //               },
  //             },
  //             {
  //               "educations.major": {
  //                 $regex: new RegExp(msg.majorFilter, "i"),
  //               },
  //             },
  //             {
  //               "skills.skill_name": {
  //                 $regex: new RegExp(msg.skillFilter, "i"),
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ]);

  //     const studentarr = await Student.aggregatePaginate(aggregate, options);
  //     console.log(studentarr);
  //     var newStudentarr = [];
  //     studentarr.docs.map((e) => {
  //       var skillArr = e.skills;
  //       var skillcommaseperated = "";
  //       skillArr.map((skill) => {
  //         skillcommaseperated
  //           ? (skillcommaseperated =
  //               skillcommaseperated + "," + skill.skill_name)
  //           : (skillcommaseperated = skill.skill_name);
  //       });
  //       newStudent = { ...e, skills: skillcommaseperated };
  //       console.log(newStudent);
  //       newStudentarr.push(newStudent);
  //     });

  //     let result = {
  //       newStudentarr,
  //       total: studentarr.totalDocs,
  //     };
  //     (response.data = result), (response.status = 201);
  //     return null, response;
  //   } catch (err) {
  //     console.log(`error getting jobs ${err}`);
  //     err.status = 500;
  //     err.data = {
  //       errors: {
  //         body: err,
  //       },
  //     };
  //     return err, null;
  //   }
  // }
//};
    



let getStudent = async (msg) => {
 console.log("getting student")
  let response = {};
  let err = {};
  const student = await Student.findOne({
    _id: msg,
  });

  return {
    email: student.emailId,
    name: student.name,
    career_objective: student.career_objective,
    profile_picture: student.profile_picture,
    education: student.educations,
    skills: student.skills,
    experience: student.experiences,
    token: msg.auth,
    college: student.college,
    city: student.city,
    country: student.country,
    phone: student.phone,
    dob: student.dob,
    state: student.state,
    status: 200,
  };
};

let getVisitedStudent = async (msg) => {
  let response = {};
  let err = {};

  Decryptedtoken = decryptToken(msg.auth);

  console.log(Decryptedtoken.email);
  if (Decryptedtoken.email !== null) {
    const student = await Student.findOne({
      student_basic_detail_id: msg.id,
    });
    if (student) {
      data = {
        _id: student._id,
        email: student.emailId,
        name: student.name,
        career_objective: student.career_objective,
        profile_picture: student.profile_picture,
        education: student.educations,
        skills: student.skills,
        experience: student.experiences,
        token: msg.auth,
        college: student.college,
        city: student.city,
        country: student.country,
        phone: student.phone,
        dob: student.dob,
        state: student.state,
      };
      (response.data = data), (response.status = 201);
      return null, response;
    } else {
      err.status = 401;
      err.data = {
        errors: {
          body: "Unauthorised User",
        },
      };

      console.log(err.status + "no student");
      return err, null;
    }
  } else {
    err.status = 401;
    err.data = {
      errors: {
        body: "Unauthorised User",
      },
    };
    return err, null;
  }
};

exports.getVisitedStudent = getVisitedStudent;
exports.getStudent = getStudent;
exports.getAllStudents = getAllStudents;
