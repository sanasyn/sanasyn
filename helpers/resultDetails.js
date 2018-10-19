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

function getDetails(req, res){
  return getStudyInfo(req.body.facility_id)
    .then((data)=> getContactInfo(data, req.body.facility_id))
    .then((data) => res.send(data))
}

function getStudyInfo(facilityInfo){
  return knex
    .select('nct_id','brief_title','description','phase','city','state','zip','criteria_inc','criteria_ex')
    .from('aact_master')
    .where('facility_id', '=', facilityInfo)
    .then(row => {
      return row
    })
}

function getContactInfo(data, facilityInfo){
  return knex
    .select('facility_name','central_contact_name','central_contact_phone','central_contact_email','facility_contact_name','facility_contact_phone','facility_contact_email','facility_name','pi_name','city','state','zip','country')
    .from('contact_info')
    .where('facility_id', '=', facilityInfo)
    .then(row => {
      return {
        study: data,
        contact: row
      }
    })
}

module.exports = getDetails;