const sequelize = require("sequelize");
const DT = sequelize.DataTypes;
const bcrypt = require('bcrypt');
const sequelizeconnection = new sequelize('handshake', 'admin', 'admin#123', {
    host: 'handshake.chf9uwuchcb3.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
  });
  const mongoose= require('mongoose')
  const uniqueValidator = require('mongoose-unique-validator')
  
  const company=new mongoose.Schema({
      company_name:String,
      emailId:String,
      password:String,
      location:String,
      description:String,
      phone:String,
      profilepicaddress:String,
      profilepicname:String
  })


  
  

  const job=new mongoose.Schema({
    company_id:String,
    company_name:String,
    job_id:String,
    job_title:String,
    deadline:String,
    location:String,
    salary:String,
    job_description:String,
    job_category:String
},
{ timestamps: true }
)

const event= new mongoose.Schema({
    company_basic_detail_id:String,
    company_name:String,
    event_detail_id:String,
    event_name:String,
    date:Date,
    event_time:String,
    location:String,
    eligibility:String,
    event_description:String
},
   { timestamps: true })








   company.plugin(uniqueValidator);
   
   const Company = mongoose.model("company", company);
   const Job = mongoose.model("job", job);
   const Event = mongoose.model("event", event);
   
   module.exports = {
     Company,Job,Event
   };