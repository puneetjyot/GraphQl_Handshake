const { Student } = require("../db/studentmodel");
const { Company } = require("../db/comapnymodel");
const { generateToken, decryptToken } = require("../service/tokenservice");


let getCompany = async (msg) => {
  let response = {};
  let err = {};
  console.log("----------getting company details");
  Decryptedtoken = decryptToken(msg.auth);
  console.log(Decryptedtoken.email);
  try {
    await Company.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
           let result={
                company: {
                    company_basic_details: tokenuser
                  }
            };
            (response.data = result), (response.status = 201);
      return (null, response);
         
        } else {
            err.status = 500;
            err.data = {
              errors: {
                body: "Server error"
              }
            };
        }
      })
      .catch(err => {
        console.log(`error posting student journey ${err}`);
      });
    //console.log(companyId);
  } catch (err) {
    console.log(err);
    err.status = 500;
    err.data = {
      errors: {
        body: "Server error"
      }
    };
  }
};

let postDeatils = async (msg) => {
    let response = {};
    let err = {};
    console.log("----------posting company details in real");
    Decryptedtoken = decryptToken(msg.auth);
    console.log(Decryptedtoken.email);
    try {
      await Company.findOne({
        emailId: Decryptedtoken.email
      })
        .then(tokenuser => {
          console.log(tokenuser);
  
          companyId = tokenuser.company_basic_detail_id;
          email = tokenuser.emailId;
          name = tokenuser.company_name;
        })
        .catch(err => {
          console.log(`error posting company details ${err}`);
        });
      const filter = { company_basic_detail_id: companyId };
      const update = { description: msg.company.description };
      const result = await Company.findOneAndUpdate(filter, update, {
        new: true
      });
  
      if (result) {
        console.log(result);
        (response.data = result), (response.status = 201);
        return (null, response);
      } else {
          err.status = 500;
          err.data = {
            errors: {
              body: "Server error"
            }
          };
      }
    } catch (err) {
      err.status = 500;
      err.data = {
        errors: {
          body: "Server error"
        }
      };
    }
  };
  let editInfo = async (msg) => {
    let response = {};
    let err = {};
    
    console.log("In updating company");
    var studentId;
    try {
      let name, location, phone;
    const tokenuser=  await Company.findOne({
       _id:msg.id
      })
       
        name = msg.name
          ? msg.name
          : tokenuser.company_name;
        location = msg.location
          ? msg.location
          : tokenuser.location;
        phone = msg.phone ? msg.phone : tokenuser.phone;
  
        const filter = {_id: msg.id };
  
        const update = {
          company_name: name,
          location: location,
          phone: phone
        };
        const result = await Company.findOneAndUpdate(filter, update, {
          new: true
        });
  
        if (result) {
          console.log(result);
    


        return {status:200,message:"edited info"};
        } else {
          err.status = 403;
        err.data = {
          errors: {
            message: "unable to add jobs"
          }
        };
        return (err, null);
        }
    
    } catch (err) {
      console.log(err);
      err.status = 403;
        err.data = {
          errors: {
            message: "unable to add jobs"
          }
        };
        return (err, null);
    }
  };
  
exports.editInfo = editInfo;
exports.postDeatils = postDeatils;
exports.getCompany = getCompany;
