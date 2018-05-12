const questionaire = [
    {
        question:'ZIP Code',
        type:'text',
        options:'',
        followupQ:''
    },
    {
        question: 'Age in years',
        type:'text',
        options:'',
        followupQ:''
    },
    {
        question: 'Sex',
        type:'radio',
        options:[ 'Male','Female'],
        followupQ:''
      
    },
    {
        question:"Race",
        type:'radio',
        options:["Native American/Alaska Native","Asian/Pacific Islander","Hispanic","Black non-Hispanic","White non-Hispanic","Other"],
        followupQ:[{
            question:"Please write in your race.",
            type:'text',
            options:''

        }]
    },
    {
        question: 'Have you had genetic testing done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Was APOE4 detected?',
            type:'radio',
            options:[ 'Yes','No']
        
        },
        {
            question: 'Would you consent to genetic testing?',
            type: 'radio',
            options: ['Yes','No']
        }
        ]
    },
    {
        question: 'Would you consent to an MRI?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Would you consent to a PET scan?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Would you consent to a lumbar puncture/spinal tap?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''

    },
    {
        question: 'Did you have a cerebrovascular or cardiovascular event in the last year? |(myocardial infarction, heart attack, congestive heart failure, valvular disease, hypertrophic cardiomyopathy, transient ischemic attack, stroke)',

        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''

    },
    {
        question: 'Memory enhancing medications. Check all that apply',
        type:'checkbox',
        options:['Aricept','Exelon','Razadyne ER','Namenda','None'],
        followupQ:[
            {
                parentAnswer:'',
                question: 'Have you been on selected medication(s) for more than 10 weeks?',
                type:'radio',
                options:['Yes','No']
            }
        ]
    },
    {
        question: 'Do you have an available family member/caregiver for trial visits?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Do you have a primary care physician?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Have you been diagnosed with cancer in the last 5 years?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question:"Why are you using this application? Check all that apply.",
        type:'checkbox',
        options:["Family history of Alzheimer's disease","Interested in clinical research","Memory complaints","Other"],
        followupQ:[{
            question:"Please write in your reason.",
            type:'text',
            options:''

        }]
    } 

]

export default questionaire;