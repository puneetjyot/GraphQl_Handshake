const sequelize = require("sequelize");
const DT = sequelize.DataTypes;
const bcrypt = require("bcrypt");
const sequelizeconnection = new sequelize("handshake", "admin", "admin#123", {
  host: "handshake.chf9uwuchcb3.us-east-1.rds.amazonaws.com",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const student_profile = new mongoose.Schema({
  student_profile_id: String,
  career_objective: String,
  profile_picture: String,
  resume: String,
});

const student_education = new mongoose.Schema({
  education_id: String,
  school_name: String,
  education_level: String,
  start_time: String,
  end_time: String,
  major: String,
  minor: String,
  gpa: String,
});
const student_experience = new mongoose.Schema({
  job_id: String,
  job_title: String,
  employer: String,
  start_time: String,
  end_time: String,
  location: String,
  still_working_boolean: Boolean,
  description: String,
});
const student_skills = new mongoose.Schema({
  skill_id: String,
  skill_name: String,
});

const student = new mongoose.Schema({
  student_basic_detail_id: String,
  name: String,
  dob: String,
  college: String,
  city: String,
  studentstate: String,
  country: String,
  emailId: { type: String, unique: true },
  phone: String,
  password: String,
  student_profile_id: String,
  career_objective: String,
  profile_picture: String,
  resume: String,
  educations: [student_education],
  experiences: [student_experience],
  skills: [student_skills],
});
student.plugin(uniqueValidator);

const Student = mongoose.model("student", student);

// student_profile.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_education.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_experience.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_skills.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})

module.exports = {
  Student,
};
