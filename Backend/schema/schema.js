const graphql = require("graphql");
const { Student } = require("../db/studentmodel");
const { Company,Job } = require("../db/comapnymodel");
const { StudentJobs } = require("../db/jobmodel");

// const User = require("../dbSchema/users");
const { companyLogin, studentLogin } = require("../functions/login");
const { companyRegister, studentRegister } = require("../functions/register");
const {
  updateName,
  updateBasicDetail,
  updateJourney,
} = require("../functions/studentprofile");
const {addEducation,editEducation} = require('../functions/education');
const {addExperience,editExperience} = require('../functions/experience');
const {editInfo} = require('../functions/company');

const {addJob,applyJob} = require('../functions/job');


// const { customerSignup, ownerSignup } = require('../mutations/signup');
// const { updateCustomer, updateOwner } = require('../mutations/profile');
// const { addMenuSection, addMenuItem } = require('../mutations/menu');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;




const CompanyType=new GraphQLObjectType({
  name:"Company",
  fields:()=>({
    status: { type: GraphQLString },
    id: { type: GraphQLID },
    company_name: { type: GraphQLString },
    emailId: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    phone: { type: GraphQLString },
    profilepicaddress: { type: GraphQLString },
    profilepicname: { type: GraphQLString }

  })
})

const JobType=new GraphQLObjectType({
  name:"Job",
  fields:()=>({
    company_id:{ type: GraphQLString },
    company_name:{ type: GraphQLString },
    id:{ type: GraphQLString },
    job_title:{ type: GraphQLString },
    deadline:{ type: GraphQLString },
    location:{ type: GraphQLString },
    salary:{ type: GraphQLString },
    job_description:{ type: GraphQLString },
    job_category:{ type: GraphQLString }

  })
})

const StudentJobType=new GraphQLObjectType({
  name:"StudentJob",
  fields:()=>({
    // company_id:{ type: GraphQLString },
    // company_name:{ type: GraphQLString },
    // id:{ type: GraphQLString },
    // job_title:{ type: GraphQLString },
    // deadline:{ type: GraphQLString },
    // location:{ type: GraphQLString },
    // salary:{ type: GraphQLString },
    // job_description:{ type: GraphQLString },
    // job_category:{ type: GraphQLString }
    status:{type:GraphQLString},
    student_id:{type: GraphQLString},
    job_id:{type:JobType},
    createdAt:{type: GraphQLString}



  })
})
const StudentJobType2=new GraphQLObjectType({
  name:"StudentJob2",
  fields:()=>({
    // company_id:{ type: GraphQLString },
    // company_name:{ type: GraphQLString },
    // id:{ type: GraphQLString },
    // job_title:{ type: GraphQLString },
    // deadline:{ type: GraphQLString },
    // location:{ type: GraphQLString },
    // salary:{ type: GraphQLString },
    // job_description:{ type: GraphQLString },
    // job_category:{ type: GraphQLString }
    status:{type:GraphQLString},
    student_id:{type: StudentType},
    job_id:{type:JobType},
    createdAt:{type: GraphQLString}



  })
})

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    status: { type: GraphQLString },
    id: { type: GraphQLID },
    emailId: { type: GraphQLString },
    name: { type: GraphQLString },
    career_objective: { type: GraphQLString },
    profile_picture: { type: GraphQLString },
    college: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString },
    dob: { type: GraphQLString },
    studentstate: { type: GraphQLString },
    educations: {
      type: new GraphQLList(EducationType),
      resolve(parent, args) {
        return parent.educations;
      },
    },
    experiences: {
      type: new GraphQLList(ExperienceType),
      resolve(parent, args) {
        return parent.experiences;
      },
    },
    skills: { type: new GraphQLList(GraphQLString) },
  }),
});

const EducationType = new GraphQLObjectType({
  name: "Education",
  fields: () => ({
    _id: { type: GraphQLString },
    education_id: { type: GraphQLString },
    school_name: { type: GraphQLString },
    education_level: { type: GraphQLString },
    start_time: { type: GraphQLString },
    end_time: { type: GraphQLString },
    major: { type: GraphQLString },
    minor: { type: GraphQLString },
    gpa: { type: GraphQLString },
  }),
});

const ExperienceType = new GraphQLObjectType({
  name: "Experience",
  fields: () => ({
    _id: { type: GraphQLString },
    job_title: { type: GraphQLString },
    employer: { type: GraphQLString },
    start_time: { type: GraphQLString },
    end_time: { type: GraphQLString },
    location: { type: GraphQLString },
    still_working_boolean: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
const SkillType = new GraphQLObjectType({
  name: "Skill",
  fields: () => ({
    _id: { type: GraphQLString },
    skill_name: { type: GraphQLString },
  }),
});

const StatusType = new GraphQLObjectType({
  name: "Status",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    loginId: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getStudent: {
      type: StudentType,
      args: { studentId: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log("resolving");
        let user = await Student.findById(args.studentId);
        console.log(user);
        if (user) {
          return user;
        }
      },
    },
    getStudentList: {
      type: new GraphQLList(StudentType),
      args: { studentId: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log("resolving");
        let users = await Student.find();
        console.log(users);
        if (users) {
          console.log("returning")
          return users;
        }
      },
    },
    getStudentByJob: {
      type: new GraphQLList(StudentJobType2),
      args: { jobId: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log("resolving");
        let users = await StudentJobs.find({job_id:args.jobId}).populate("student_id").populate("job_id");
        console.log(users);
        if (users) {
          console.log("returning")
          return users;
        }
      },
    },
  
  getCompany: {
    type: CompanyType,
    args: { companyId: { type: GraphQLString } },
    async resolve(parent, args) {
      console.log("resolving");
      let user = await Company.findById(args.companyId);
      console.log(user);
      if (user) {
        return user;
      }
    },
  },
  getJobs:{
    type: new GraphQLList(JobType),
    args: { companyId: { type: GraphQLString } },
    async resolve(parent, args) {
      console.log("resolving");
      console.log(args.companyId)
      let jobs=''
      if(args.companyId=='Student')
      {
         jobs = await Job.find();
      }
      else{
       jobs = await Job.find({company_id:args.companyId});
      }
      console.log(jobs);
      if (jobs) {
        return jobs;
      }
    },
  },

getAppliedJobs:{
  type: new GraphQLList(StudentJobType),
  args: { student_id: { type: GraphQLString } },
  async resolve(parent, args) {
    console.log("resolving");
    var newArr=[]
    let user = await StudentJobs.find({student_id:args.student_id}).populate("job_id");
    //console.log(user);
   
    // user.map(i=>{
    //   console.log(i.createdAt)
    //   var obj={...i,createdAt:createdAt.toString()}
    //   newArr.push(obj)
    
    
    // })
    // console.log(newArr)
    if (user) {
      return user;
    }
  },
}
},
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        college: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentRegister(args);
      },
    },
    addCompany: {
      type: StatusType,
      args: {
        company_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyRegister(args);
      },
    },

    studentLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return studentLogin(args);
      },
    },
    companyLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return companyLogin(args);
      },
    },
    updateName: {
      type: StudentType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateName(args);
      },
    },
    updateBasicDetail: {
      type: StudentType,
      args: {
        dob: { type: GraphQLString },
        id: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        studentstate: { type: GraphQLString },
        phone: { type: GraphQLString },
        emailId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateBasicDetail(args);
      },
    },
    updateJourney: {
      type: StudentType,
      args: {
        career_objective: { type: GraphQLString },
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateJourney(args);
      },
    },

    addEducation: {
      type: StatusType,
      args: {
        id: { type: GraphQLString },
        school_name: { type: GraphQLString },
        education_level: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        major: { type: GraphQLString },
        minor: { type: GraphQLString },
        gpa: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addEducation(args);
      },
    },
    editEducation: {
      type: StatusType,
      args: {
        _id:{type: GraphQLString},
        id: { type: GraphQLString },
        school_name: { type: GraphQLString },
        education_level: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        major: { type: GraphQLString },
        minor: { type: GraphQLString },
        gpa: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return editEducation(args);
      },
    },
    addExperience: {
      type: StatusType,
      args: {
        id:{type: GraphQLString},
        job_title: { type: GraphQLString },
        employer: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addExperience(args);
      },
    },
    editExperience: {
      type: StatusType,
      args: {
        _id:{type: GraphQLString},
        id:{type: GraphQLString},
        job_title: { type: GraphQLString },
        employer: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return editExperience(args);
      },
    },
    addJob:{
      type: StatusType,
      args: {
        id:{type: GraphQLString},
        company_id:{ type: GraphQLString },
        company_name:{ type: GraphQLString },
        job_title:{ type: GraphQLString },
        deadline:{ type: GraphQLString },
        location:{ type: GraphQLString },
        salary:{ type: GraphQLString },
        job_description:{ type: GraphQLString },
        job_category:{ type: GraphQLString }
      },
      async resolve(parent, args) {
        return addJob(args);
      },
    },
    editInfo:{
      type: StatusType,
      args: {
        location:{ type: GraphQLString },
        phone:{ type: GraphQLString },
        name:{ type: GraphQLString },
        id:{ type: GraphQLString }
      },
      async resolve(parent, args) {
        return editInfo(args);
      },
    },
    applyJob:{
      type: StatusType,
      args: {
        job_id:{type:GraphQLString},
        student_id:{type:GraphQLString}
      },
      async resolve(parent, args) {
        console.log(args)
        return applyJob(args);
      },
    }
  },

});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
