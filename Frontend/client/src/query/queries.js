import { gql } from "apollo-boost";

const getStudent = gql`
  query($studentId: String) {
    getStudent(studentId: $studentId) {
      name
      dob
      college
      city
      studentstate
      country
      phone
      career_objective
      profile_picture
      emailId
      educations {
        _id
        education_id
        school_name
        education_level
        start_time
        end_time
        major
        minor
        gpa
      }
      experiences {
        _id
        job_title
        employer
        start_time
        end_time
        location
        still_working_boolean
        description
      }
    }
  }
`;

const getStudentList = gql`
  query($studentId: String) {
    getStudentList(studentId: $studentId) {
        id
      name
      dob
      college
      city
      studentstate
      country
      phone
      career_objective
      profile_picture
      emailId
      educations {
        _id
        education_id
        school_name
        education_level
        start_time
        end_time
        major
        minor
        gpa
      }
      experiences {
        _id
        job_title
        employer
        start_time
        end_time
        location
        still_working_boolean
        description
      }
    }
  }
`;

const getStudentByJob = gql`
  query($jobId: String) {
    getStudentByJob(jobId: $jobId) {
      status,
       job_id{
           job_title
           deadline
           location
           salary
           job_description
           company_name
           
       },
       student_id{
         id
         name
         profile_picture
         college
         educations {
          _id
          education_id
          school_name
          education_level
          start_time
          end_time
          major
          minor
          gpa
        }
       }
       createdAt
      }
  }
`;


const getCompany = gql`
  query($companyId: String) {
    getCompany(companyId: $companyId) {
      company_name
      emailId
      password
      location
      description
      phone
      profilepicaddress
      profilepicname
    }
  }
`;

const getJobs = gql`
  query($companyId: String) {
    getJobs(companyId: $companyId) {
        id
        job_title
        deadline
        location
        salary
        job_description
        job_category
        company_name
        company_id
    }
  }
`;

const getAppliedJobs = gql`
  query($student_id: String) {
    getAppliedJobs(student_id: $student_id) {
       status,
       job_id{
           job_title
           deadline
           location
           salary
           job_description
           company_name
           
       }
       student_id
       createdAt
    }
  }
`;

export { getStudent, getStudentList,getCompany,getJobs,getAppliedJobs,getStudentByJob };
