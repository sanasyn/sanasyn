const config = require('../config/config').heroku;
const pg = require('pg');
const knex = require('knex')(getConnectionOptions());

const geneticQueryInc = require('./setQuery').geneticQueryInc;
const geneticQueryEx = require('./setQuery').geneticQueryEx;
const mriQuery = require('./setQuery').mriQuery;
const petQuery = require('./setQuery').petQuery;
const spinalQuery = require('./setQuery').spinalQuery;
const strokeQuery = require('./setQuery').strokeQuery;
const cancerQuery = require('./setQuery').cancerQuery;
const medicationsQuery = require('./setQuery').medicationsQuery;
const medicationsQueryNot = require('./setQuery').medicationsQueryNot;
const caregiverQueryInc = require('./setQuery').caregiverQueryInc;
const getFacilityDistance = require('./location');

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

function runQuery(req, res) {
	console.log("Request: ", req.body);
	// console.time("TIME");
	let query = req.body;
	return knex
	// .distinct()
	.select('nct_id','brief_title','facility_id','city','state','zip','country','criteria_ex')
	// .count()
	.from('aact_master')
	.where(function() {
		this
		.where('minimum_age', '<=' , query.age)
		.andWhere('maximum_age', '>=' , query.age)
		.orWhere({
			'minimum_age': 'N/A',
			'maximum_age': 'N/A'
		})
	})
	.andWhere(function() {
		this
		.where('gender', query.gender)
		.orWhere('gender', 'All')
	})
	.andWhere(knex.raw("criteria_inc ILIKE ( :search)", 
		{search: geneticQueryInc(query.geneticTesting)}
		))
	.andWhere(knex.raw("criteria_ex NOT LIKE ALL ( :spinalSearch)", 
		{spinalSearch: spinalQuery(query.spinalTap)}
		))
	.andWhere(knex.raw("criteria_ex NOT ILIKE ALL ( :multipleSearch)", 
		{multipleSearch: buildNotILikeQueryEx(query)}
		))
	.then(rows => {
		return getFacilityDistance(query.zipcode, rows)
			.then((results) => {
				// console.log(results)
				res.send(results)
			})
	})
	// .then(()=>{console.timeEnd("TIME");})
	.catch((error) => {
		res.send(new Error('Error querying database. ', error));
	});
	
}

function buildNotILikeQueryEx(request) {
	let buildArray=[];
	let functionArray = [
		geneticQueryEx(request.geneticTesting),
		mriQuery(request.mri),
		petQuery(request.pet),
		strokeQuery(request.stroke),
		cancerQuery(request.cancer),
		medicationsQuery(request.medications),
		caregiverQueryInc(request.informant)
	];
	for (let i=0; i<functionArray.length; i++) {
		if (functionArray[i].join().length) {
			buildArray.push(...functionArray[i]);
		}
	}
	if (!buildArray.length) {
		buildArray=[''];
	}
	return buildArray;
}

module.exports = {
	runQuery: runQuery,
}