const questionaire = [
    {
        question:'Zipcode',
        type:'text',
        options:'',
        followupQ:''
    },
    {
        question: 'Age in Years',
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
        question: 'Genetic testing done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Is APOE4 detected?',
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
        question: 'Would you consent to a MRI?',
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
        question: 'Did you have a cerebrovascular or cardiovascular event in the last year? (myocardial infarction; congestive heart failure, valvular disease, hypertrophic cardiomyopathy, transient ischemic attack, stroke)',
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
                question: 'Have you been On selected medication(s) for more than 10 weeks?',
                type:'radio',
                options:['Yes','No']
            }
        ]
    },
    {
        question: 'Availability of family member/caregiver to accompany you for trial visits.',
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
        question:"Why are you using this app? Check all that apply.",
        type:'checkbox',
        options:["Family history of Alzhimer's Disease","Interested in Clinical research","Memory Complants","Other"],
        followupQ:[{
            question:"Please write in your reason.",
            type:'text',
            options:''

        }]

        
    }

]

export default questionaire;