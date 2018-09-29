const questionaire = [
  {
      question:'¿Cuál es su código postal?',
      type:'text',
      options:'',
      help:[],
      answerState: 'zipcode'
  },
  {
      question: '¿Cuantos años tienes?',
      type:'text',
      options:'',
      help:[],
      answerState: 'age'
  },
  {
      question: '¿Cuál es tu sexo?',
      type:'radio',
      options:[ 'Masculino','Hembra'],
      help:[],
      answerState: 'gender'
  },
  {
      question:"¿Cuál es su raza?",
      type:'radio',
      options:["Nativo americano/Nativo de Alaska","asiático/Islas del Pacífico","Hispano","Black non-Hispanic","White non-Hispanic","Other"],
      help:[],
      answerState: 'race'
  },
  {
      question:"Por favor escribe en tu raza",
      type:'text',
      options:'',
      help:[],
      answerState: 'race'
  },
  {
      question: '¿Le hicieron una prueba genética?',
      type:'radio',
      options:[ ' Sí','No'],
      help: ['Las pruebas genéticas usan muestras de ADN (como la saliva) para comprender su composición genética y determinar la susceptibilidad a ciertas enfermedades. Algunos ejemplos de pruebas genéticas incluyen 23 & me y Ancestry.com.'],
      answerState: 'geneticTesting',
      answerState2: 'taken'
  },
  {
      question: 'Fue APOE4 detectó?',
      type:'radio',
      options:[ 'Sí','No'],
      help: ['APOe4 está presente en aproximadamente el 10-15% del ADN de la población humana. La presencia de APOe4 indica un mayor riesgo de Alzheimer; no indica si una persona desarrollará Alzheimer o si una persona tiene Alzheimer.'],
      answerState: 'geneticTesting',
      answerState2: 'apoe4Present'
  },
  {
      question: '¿Aceptaría las pruebas genéticas?',
      type: 'radio',
      options: [' Sí','No'],
      help: [ 
      'En ensayos clínicos, se le pedirá que otorgue un permiso donde la mayoría de las pruebas genéticas actuales solo requieren una muestra de saliva. Esta muestra se usará para realizar análisis genéticos para ver si tiene alguno de los factores de riesgo genéticos para la enfermedad de Alzheimer.'],
      answerState: 'geneticTesting',
      answerState2: 'consent'
  },
  {
      question: '¿Aceptaría una resonancia magnética?',
      type:'radio',
      options:['Sí','No'],
      help: [
      'La resonancia magnética, abreviatura de resonancia magnética, es una técnica de radiología no invasiva e indolora, ampliamente utilizada por las prácticas médicas para informar anomalías en los órganos de interés. Para la enfermedad de Alzheimer, los investigadores y los médicos usan esto para examinar su cerebro y también descartar otras afecciones que pueden causar síntomas similares a los de la enfermedad de Alzheimer.'],
      answerState: 'mri'
  },
  {
      question: '¿Aceptaría una exploración PET?',
      type:'radio',
      options:[ 'Sí','No'],
      help: [
      'Una exploración por TEP es una técnica de exploración especial que destaca la actividad celular en un órgano específico. Un signo común de la enfermedad de Alzheimer es una acumulación de proteína amiloide en el cerebro. Los ensayos clínicos a menudo realizan exploraciones PET para determinar la presencia de proteína amiloide en el cerebro. Esto puede permitir a los médicos diagnosticar el Alzheimer antes, incluso antes de que aparezcan los síntomas cognitivos.'],
      answerState: 'pet'
  },
  {
      question: '¿Consintirías en una punción lumbar / punción espinal?',
      type:'radio',
      options:[ 'Sí','No'],
      help: [
      'El diagnóstico de la enfermedad de Alzheimer incluye una gran cantidad de pruebas diferentes, incluida la punción lumbar donde se extrae el líquido cefalorraquídeo para buscar proteínas como amiloide y tau para determinar la enfermedad de Alzheimer. Junto con MRI y PET, los investigadores pueden determinar si una persona padece la enfermedad de Alzheimer o alguna otra forma de deterioro de la memoria.'],
      answerState: 'spinalTap'
  },
  {
      question: '¿Tuvo un evento cerebrovascular o cardiovascular en el último año?',
      type:'radio',
      options:['Sí','No'],
      help:['El evento cardiovascular significa infarto de miocardio, ataque cardíaco, insuficiencia cardíaca congestiva, enfermedad valvular, miocardiopatía hipertrófica, ataque isquémico transitorio, accidente cerebrovascular.'],
      answerState: 'stroke'
  },
  {
      question: 'Medicamentos que mejoran la memoria. Marque todo lo que corresponda',
      type:'checkbox',
      options:['Aricept (generic name: donepezil)','Exelon (generic name: rivastigmine)','Razadyne (generic name: galantamine)','Namenda (generic name: memantine)', 'None'],
      help:[],
      answerState: 'medications',
      answerState2: 'list'
  },
  {
      question: '¿Ha estado tomando medicamentos seleccionados por más de 10 semanas?',
      type:'radio',
      options:['Sí','No'],
      help:['Si actualmente está tomando medicamentos, la mayoría de los ensayos clínicos requieren que los tome durante al menos 10 semanas antes de participar en el ensayo.'],
      answerState: 'medications',
      answerState2: 'acceptableTime'
  },
  {
      question: '¿Tiene un familiar / cuidador disponible para visitas de prueba?',
      type:'radio',
      options:[ 'Sí','No'],
      help: ['Un cuidador es un miembro de la familia o un ayudante pagado que cuida regularmente a una persona enferma, discapacitada o anciana.', 
      
      'Los investigadores quieren asegurarse de que los participantes en los ensayos clínicos se sientan seguros en todo momento. Por lo tanto, la mayoría de los ensayos clínicos requieren que el participante tenga un cuidador para ayudar a responder preguntas y proporcionar transporte.'],
      answerState: 'informant'
  },
  {
      question: '¿Tienes un médico de atención primaria?',
      type:'radio',
      options:[ 'Sí','No'],
      help:[],
      answerState: 'primaryCare'
  },
  {
      question: '¿Le han diagnosticado cáncer en los últimos 5 años?',
      type:'radio',
      options:[ 'Sí','No'],
      help:[],
      answerState: 'cancer'
  },
  {
      question:"¿Por qué estás usando esta aplicación? Marque todo lo que corresponda.",
      type:'checkbox',
      options:["Antecedentes familiares de la enfermedad de Alzheimer","Interesado en la investigación clínica","Quejas de memoria","Otro"],
      help:[],
      answerState: 'opinion',
      answerState2: 'list'
  },
  {
      question:"Por favor escribe tu razón.",
      type:'textarea',
      options:'',
      help:[],
      answerState: 'opinion',
      answerState2: 'otherText'
  } 
]

export default questionaire;