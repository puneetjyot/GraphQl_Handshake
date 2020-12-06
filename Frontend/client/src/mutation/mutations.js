import { gql } from "apollo-boost";
const studentLoginMutation = gql`
  mutation studentLogin($email: String, $password: String) {
    studentLogin(email: $email, password: $password) {
      status
      message
      loginId
    }
  }
`;
const companyLoginMutation = gql`
  mutation companyLogin($email: String, $password: String) {
    companyLogin(email: $email, password: $password) {
      status
      message
      loginId
    }
  }
`;
const registerCompanyMutation = gql`
  mutation addCompany(
    $company_name: String
    $email: String
    $password: String
    $location: String
    $phone: String
  ) {
    addCompany(
      email: $email
      password: $password
      company_name: $company_name
      location: $location
      phone: $phone
    ) {
      message
      status
      loginId
    }
  }
`;
const registerStudentMutation = gql`
  mutation addStudent(
    $name: String
    $email: String
    $password: String
    $college: String
  ) {
    addStudent(
      email: $email
      password: $password
      name: $name
      college: $college
    ) {
      message
      status
      loginId
    }
  }
`;

const updateName = gql`
  mutation updateName($name: String, $id: String) {
    updateName(name: $name, id: $id) {
      name
    }
  }
`;

const updateBasicDetails = gql`
  mutation updateBasicDetail(
    $dob: String
    $id: String
    $city: String
    $country: String
    $studentstate: String
    $phone: String
    $emailId: String
  ) {
    updateBasicDetail(
      id: $id
      city: $city
      dob: $dob
      country: $country
      studentstate: $studentstate
      phone: $phone
      emailId: $emailId
    ) {
      country
      city
      studentstate
      status
      emailId
      dob
      phone
    }
  }
`;

const updateJourney = gql`
  mutation updateJourney($career_objective: String, $id: String) {
    updateJourney(career_objective: $career_objective, id: $id) {
      career_objective
      status
    }
  }
`;
const addEducation = gql`
  mutation addEducation(
    $school_name: String
    $id: String
    $educationlevel: String
    $major: String
    $minor: String
    $startDate: String
    $endDate: String
    $gpa: String
  ) {
    addEducation(
      school_name: $school_name
      id: $id
      education_level: $educationlevel
      major: $major
      minor: $minor
      start_time: $startDate
      end_time: $endDate
      gpa: $gpa
    ) {
      message
      status
    }
  }
`;

const editEducation = gql`
  mutation addEducation(
    $_id: String
    $school_name: String
    $id: String
    $educationlevel: String
    $major: String
    $minor: String
    $startDate: String
    $endDate: String
    $gpa: String
  ) {
    editEducation(
      _id: $_id
      school_name: $school_name
      id: $id
      education_level: $educationlevel
      major: $major
      minor: $minor
      start_time: $startDate
      end_time: $endDate
      gpa: $gpa
    ) {
      message
      status
    }
  }
`;

const addExperience = gql`
  mutation addExperience(
    $job_title: String
    $id: String
    $employer: String
    $location: String
    $description: String
    $start_time: String
    $end_time: String
  ) {
    addExperience(
      job_title: $job_title
      id: $id
      employer: $employer
      location: $location
      description: $description
      start_time: $start_time
      end_time: $end_time
    ) {
      message
      status
    }
  }
`;

const editExperience = gql`
  mutation editExperience(
    $job_title: String
    $_id: String
    $id: String
    $employer: String
    $location: String
    $description: String
    $start_time: String
    $end_time: String
  ) {
    editExperience(
      job_title: $job_title
      _id: $_id
      id: $id
      employer: $employer
      location: $location
      description: $description
      start_time: $start_time
      end_time: $end_time
    ) {
      message
      status
    }
  }
`;

const addJob = gql`
  mutation addJob(
        $companyId:String
        $job_title:String
        $deadline:String,
        $location:String,
        $salary:String,
        $job_description:String,
        $job_category:String,
  ) {
    addJob(
        job_title:$job_title,
        deadline:$deadline,
        location:$location,
        salary:$salary,
        job_description:$job_description,
        job_category:$job_category,
        company_id:$companyId
    ) {
      message
      status
    }
  }
`;
const editInfo = gql`
  mutation editInfo(
    $location:String,
    $phone:String,
    $name:String,
    $id:String
  ) {
    editInfo(
        location:$location,
    phone:$phone,
    name:$name,
    id:$id
    ) {
      message
      status
    }
  }
`;

const applyJob = gql`
  mutation applyJob(
    $job_id:String,
    $student_id:String
  ) {
    applyJob(
       job_id: $job_id,
       student_id: $student_id
    ) {
      message
      status
    }
  }
`;

export {
  studentLoginMutation,
  companyLoginMutation,
  registerStudentMutation,
  registerCompanyMutation,
  updateName,
  updateBasicDetails,
  updateJourney,
  addEducation,
  editEducation,
  addExperience,
  editExperience,
  addJob,
  editInfo,applyJob
};
