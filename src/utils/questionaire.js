const questionaire = [
    {
        question:'What is your ZIP code?',
        type:'text',
        options:'',
        help:[],
    },
    {
        question: 'How old are you?',
        type:'text',
        options:'',
        help:[],
    },
    {
        question: 'What is your sex?',
        type:'radio',
        options:[ 'Male','Female'],
        help:[],
    },
    {
        question:"What is your race?",
        type:'radio',
        options:["Native American/Alaska Native","Asian/Pacific Islander","Hispanic","Black non-Hispanic","White non-Hispanic","Other"],
        help:[]
    },
    {
        question:"Please write in your race.",
        type:'text',
        options:'',
        help:[],
    },
    {
        question: 'Have you had genetic testing done?',
        type:'radio',
        options:[ 'Yes','No'],
        help: ['Genetic testing uses samples of DNA (such as saliva) to understand your genetic makeup and to determine susceptibility to certain diseases. Some examples of genetic testing include 23&me and Ancestry.com.']
    },
    {
        question: 'Was APOE4 detected?',
        type:'radio',
        options:[ 'Yes','No'],
        help: ['APOe4 is present in approximately 10-15% of the human population\'s DNA. The presence of APOe4 indicates a greater risk for Alzheimer\'s; it does not indicate whether a person will develop Alzheimer\'s or whether a person has Alzheimer\'s.']
    },
    {
        question: 'Would you consent to genetic testing?',
        type: 'radio',
        options: ['Yes','No'],
        help: [ 
        'In clinical trials, you will be asked to give permission where the most of the current genetic testing only requires a saliva sample. This sample will be used to run genetic analysis to see if you carry any of the genetic risk factors for Alzheimer’s disease.']
    },
    {
        question: 'Would you consent to an MRI?',
        type:'radio',
        options:[ 'Yes','No'],
        help: [
        'MRI, short for magnetic resonance imaging, is a non-invasive and painless radiology technique, widely used by medical practices to inform of abnormalities in organs of interest. For Alzheimer’s disease, researchers and clinicians use this to examine your brain and also rule out other conditions that may cause Alzheimer’s disease-like symptoms.'],
    },
    {
        question: 'Would you consent to a PET scan?',
        type:'radio',
        options:[ 'Yes','No'],
        help: [
        'A PET scan is a special scanning technique that highlights cellular activity in a specific organ. A common sign of Alzheimer’s disease is a buildup of amyloid protein in the brain. Clinical trials often conduct PET scans to determine the presence of amyloid protein in the brain. This may allow doctors to diagnose Alzheimer\'s earlier, even before any of the cognitive symptoms appear.'],
    },
    {
        question: 'Would you consent to a lumbar puncture/spinal tap?',
        type:'radio',
        options:[ 'Yes','No'],
        help: [
        'Diagnosing Alzheimer’s disease includes a lot of different tests, including spinal tap where spinal fluid is taken out to look for proteins such as amyloid and tau to determine Alzheimer\’s disease. Together with MRI and PET, researchers can determine whether an individual is suffering from Alzheimer’s disease or some other form of memory impairment.'],
    },
    {
        question: ' Did you have a cerebrovascular or cardiovascular event in the last year?',
        type:'radio',
        options:[ 'Yes','No'],
        help:['Cardiovascular event means myocardial infarction, heart attack, congestive heart failure, valvular disease, hypertrophic cardiomyopathy, transient ischemic attack, stroke']
    },
    {
        question: 'Memory enhancing medications. Check all that apply',
        type:'checkbox',
        options:['Aricept (generic name: donepezil)','Exelon (generic name: rivastigmine)','Razadyne (generic name: galantamine)','Namenda (generic name: memantine)', 'None'],
        help:[]
    },
    {
        question: 'Have you been on selected medication(s) for more than 10 weeks?',
        type:'radio',
        options:['Yes','No'],
        help:['If you are currently taking medication, most clinical trials require that you take it for at least 10 weeks prior to participating in the trial.']
    },
    {
        question: 'Do you have an available family member/caregiver for trial visits?',
        type:'radio',
        options:[ 'Yes','No'],
        help: ['A caregiver is a family member or paid helper who regularly looks after a sick, disabled or elderly person.', 
        
        'Researchers want to ensure that clinical trial participants feel safe at all times. Therefore, most clinical trials require that the participant has a caregiver to help answer questions and provide transportation.'],
    },
    {
        question: 'Do you have a primary care physician?',
        type:'radio',
        options:[ 'Yes','No'],
        help:[],
    },
    {
        question: 'Have you been diagnosed with cancer in the last 5 years?',
        type:'radio',
        options:[ 'Yes','No'],
        help:[],
    },
    {
        question:"Why are you using this application? Check all that apply.",
        type:'checkbox',
        options:["Family history of Alzheimer's disease","Interested in clinical research","Memory complaints","Other"],
    },
    {
        question:"Please write in your reason.",
        type:'textarea',
        options:'',
        help:[],
    }
]

export default questionaire;