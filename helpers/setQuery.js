const query = require('./exampleObjects').complete;

// creates genetic testing query for inclusion criteria
function geneticQueryInc(genetic) {
	let queryGenetic = '%';
	if (genetic.apoe4Present === 'Yes') {
		queryGenetic = '%APOE4%'
	}
	return queryGenetic;
}

// creates genetic testing query for exclusion criteria
function geneticQueryEx(genetic) {
	let queryGenetic = [''];
	if (genetic.consent === 'No') {
		queryGenetic = ['%APOE%','%genetic%'];
	}
	return queryGenetic;
}

// creates mri query for exclusion criteria
function mriQuery(mri) {
	let queryMri = [''];
	if (mri === 'No') {
		queryMri = ['%contraindication%MR%'];
	}
	return queryMri;
}

// creates PET scan query for exclusion criteria
function petQuery(pet) {
	let petArray = [''];
	if (pet === 'No') {
		petArray = ['%PET%', "%florbetapir%", "%F-AV-1451%"]
	}
	return petArray;
}

// creates spinal tap query for exclusion criteria
function spinalQuery(spinal) {
	let spinalArray = [''];
	if (spinal === 'No') {
		spinalArray = ['%lumbar%','%LP%']
	} 
	return spinalArray;
}

function strokeQuery(stroke) {
	let strokeArray = [''];
	if (stroke === 'Yes') {
		strokeArray = ['%stroke%', '%vascular%', '%ischemic%', '%myocardial infarction%','%congestive heart failure%', '%valvular%', '%hypertrophic cardiomyopathy%', "%cerebrovascular%", "%cardiovascular%", "%cardiac%"
		]
	}
	return strokeArray;
}

function cancerQuery(cancer) {
	let cancerArray = [''];
	if (cancer === 'Yes') {
		cancerArray = ['%cancer%']
	}
	return cancerArray;
}

// builds array used to query for medications inclusion
function medicationsQuery(medications) {
	let buildArray = [];
	let queryArray = [];
	const aricept = ['%donepezil%', '%aricept%', '%cholinesterase%'];
	const exelon = ['%rivastigmine%', '%exelon%', '%cholinesterase%'];
	const razadyne = ['%galantamine%', '%razadyne%', '%cholinesterase%'];
	const namenda = ['%memantine%', '%namenda%'];

	if (medications.acceptableTime === 'Yes'){
		if (medications.list.indexOf('Aricept (generic name: donepezil)') > -1) {
			buildArray = buildArray.concat(aricept);
		};
		if (medications.list.indexOf('Exelon (generic name: rivastigmine)') > -1) {
			buildArray = buildArray.concat(exelon);
		};
		if (medications.list.indexOf('Razadyne (generic name: galantamine)') > -1) {
			buildArray = buildArray.concat(razadyne);
		};
		if (medications.list.indexOf('Namenda (generic name: memantine)') > -1) {
			buildArray = buildArray.concat(namenda);
		};
	}

	//removes duplicates
	buildArray.forEach(element => {
		if (queryArray.indexOf(element) === -1) {
			queryArray.push(element);
		}
	})

	if (queryArray.length === 0) {
		queryArray = ['']
	}
	return queryArray;
}


// builds array used to query for medications inclusion
function medicationsQueryNot(medications) {
	let buildArray = [];
	let queryArray = [];
	const aricept = ['%donepezil%', '%aricept%', '%cholinesterase%'];
	const exelon = ['%rivastigmine%', '%exelon%', '%cholinesterase%'];
	const razadyne = ['%galantamine%', '%razadyne%', '%cholinesterase%'];
	const namenda = ['%memantine%', '%namenda%'];

	if (medications.acceptableTime === 'No'){
		if (medications.list.indexOf('Aricept (generic name: donepezil)') > -1) {
			buildArray = buildArray.concat(aricept);
		};
		if (medications.list.indexOf('Exelon (generic name: rivastigmine)') > -1) {
			buildArray = buildArray.concat(exelon);
		};
		if (medications.list.indexOf('Razadyne (generic name: galantamine)') > -1) {
			buildArray = buildArray.concat(razadyne);
		};
		if (medications.list.indexOf('Namenda (generic name: memantine)') > -1) {
			buildArray = buildArray.concat(namenda);
		};
	}

	//removes duplicates
	buildArray.forEach(element => {
		if (queryArray.indexOf(element) === -1) {
			queryArray.push(element);
		}
	})

	if (queryArray.length === 0) {
		queryArray = ['%']
	}
	return queryArray;
}

// creates caregiver query for inclusion criteria
function caregiverQueryInc(care) {
	let queryCare = [''];
	if (care === 'No') {
		queryCare = ['%caregiver%','%partner%'];
	}
	return queryCare;
}

module.exports = {
	geneticQueryInc: geneticQueryInc,
	geneticQueryEx: geneticQueryEx,
	mriQuery: mriQuery,
	petQuery: petQuery,
	spinalQuery: spinalQuery,
	strokeQuery: strokeQuery,
	medicationsQuery: medicationsQuery,
	medicationsQueryNot: medicationsQueryNot,
	caregiverQueryInc: caregiverQueryInc,
	cancerQuery: cancerQuery
}