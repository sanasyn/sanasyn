const config = require('../config/config').heroku;
const knex = require('knex')(getConnectionOptions());

function getConnectionOptions() {
	return {
		client: config.client,
		connection : {
			host: config.host,
			user: config.user,
			password: config.password,
      database: config.database,
      ssl: true
		}
	}
}

// Inserts user's reason(s) for using the app into the database
function insertReason(req, res){
  return setValues(req.body)
    .then((val) => {
      return knex
        .insert([{
          timestamp: val.timestamp,
          age: val.age,
          sex: val.sex,
          race: val.race,
          zip: val.zip,
          cancer: val.cancer,
          family_history: val.familyHistory, 
          research_interest: val.researchInterest, 
          memory_complaints: val.memoryComplaints, 
          other_reason_select: val.otherReasonSelect, 
          other_reason_text: val.otherReasonText
        }])
        .into('user_demographics')
    })
    .then(() => res.send("User demographics inserted into db"))
    .catch((err) => Promise.reject(err))

}

// Helper function to set values to true if user selected reason for use
function setValues(req){
  // Object to hold default values for app use reasons
  let reason = {
    timestamp: new Date(),
    age: req.age,
    sex: req.gender,
    race: req.race,
    zip: req.zipcode,
    cancer: req.cancer,
    familyHistory: false,
    researchInterest: false,
    memoryComplaints: false,
    otherReasonSelect: false,
    otherReasonText: ""
  }
  
  if (req.opinion.list.indexOf("Family history of Alzheimer's disease") !== -1 ) reason.familyHistory = true;
  if (req.opinion.list.indexOf("Interested in clinical research") !== -1) reason.researchInterest = true;
  if (req.opinion.list.indexOf("Memory complaints") !== -1) reason.memoryComplaints = true;
  if (req.opinion.list.indexOf("Other") !== -1) reason.otherReasonSelect = true;
  if (req.opinion.otherText.length > 0) reason.otherReasonText = req.opinion.otherText;

  return Promise.resolve(reason)
}

module.exports = insertReason;