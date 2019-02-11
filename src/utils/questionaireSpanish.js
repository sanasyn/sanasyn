const questionaire = [
  {
      question:'¿Cuál es su código postal?',
      type:'text',
      options:'',
      help:[],
      answerState: 'zipcode'
  },
  {
      question: '¿Cuál es su edad?',
      type:'text',
      options:'',
      help:[],
      answerState: 'age'
  },
  {
      question: '¿Cuál es su sexo?',
      type:'radio',
      options:[ 'Masculino','Femenino'],
      help:[],
      answerState: 'gender'
  },
  {
      question:"¿A qué raza pertenece?",
      type:'radio',
      options:["Nativo americano/Nativo de Alaska","Asiático/Islas del Pacífico","Hispano","Black non-Hispanic","White non-Hispanic","Other"],
      help:[],
      answerState: 'race'
  },
  {
      question:"Por favor escriba su raza",
      type:'text',
      options:'',
      help:[],
      answerState: 'race'
  },
  {
      question: '¿Alguna vez te han hecho una prueba genetica?',
      type:'radio',
      options:[ ' Sí','No'],
      help: ['Las pruebas genéticas usan muestras de ADN (como la saliva) para comprender su composición genética y determinar la susceptibilidad a ciertas enfermedades. Algunos ejemplos de pruebas genéticas incluyen 23 & me y Ancestry.com.'],
      answerState: 'geneticTesting',
      answerState2: 'taken'
  },
  {
      question: 'Se detecto APOE4 en la prueba?',
      type:'radio',
      options:[ 'Sí','No'],
      help: ['APOe4 está presente en aproximadamente el 10-15% del ADN de la población humana. La presencia de APOe4 indica un mayor riesgo de Alzheimer; no indica si una persona desarrollará Alzheimer o si una persona tiene Alzheimer.'],
      answerState: 'geneticTesting',
      answerState2: 'apoe4Present'
  },
  {
      question: '¿Aceptaría la realización de pruebas genéticas?',
      type: 'radio',
      options: [' Sí','No'],
      help: [ 
      'En ensayos clínicos, se le pedirá que otorgue un permiso donde la mayoría de las pruebas genéticas actuales solo requieren una muestra de saliva. Esta muestra se usará para realizar análisis genéticos y ver si presenta alguno de los factores de riesgo genéticos para la enfermedad de Alzheimer.'],
      answerState: 'geneticTesting',
      answerState2: 'consent'
  },
  {
      question: '¿Aceptaría una resonancia magnética?',
      type:'radio',
      options:['Sí','No'],
      help: [
      'La RM, como se abrevia resonancia magnética, es una técnica de radiología no invasiva e indolora, ampliamente utilizada por las prácticas médicas para informar sobre anomalías en los órganos de interés. Para la enfermedad de Alzheimer, los investigadores y médicos usan esta técnica para examinar el cerebro y también descartar otras afecciones que pueden causar síntomas similares a los de la enfermedad de Alzheimer.'],
      answerState: 'mri'
  },
  {
      question: '¿Aceptaría una exploración por PET?',
      type:'radio',
      options:[ 'Sí','No'],
      help: [
      'Una exploración por PET es una técnica de exploración especial que destaca la actividad celular en un órgano específico. Un signo común de la enfermedad de Alzheimer es una acumulación de proteína amiloide en el cerebro. En ensayos clínicos a menudo realizan exploraciones PET para determinar la presencia de proteína amiloide en el cerebro. Esto puede permitir a los médicos diagnosticar el Alzheimer en etapa temprana, incluso antes de que aparezcan los síntomas cognitivos.'],
      answerState: 'pet'
  },
  {
      question: '¿Consentirías una punción lumbar / punción espinall?',
      type:'radio',
      options:[ 'Sí','No'],
      help: [
      'El diagnóstico de la enfermedad de Alzheimer incluye una gran cantidad de pruebas diferentes, incluida la punción lumbar donde se extrae líquido cefalorraquídeo para buscar proteínas como la amiloide y tau y así determinar la enfermedad de Alzheimer. Junto con una RM y exploraciones PET, los investigadores pueden diagnosticar si una persona padece la enfermedad de Alzheimer o alguna otra forma de deterioro de la memoria'],
      answerState: 'spinalTap'
  },
  {
      question: '¿Tuvo algún evento cerebrovascular o cardiovascular en el último año?',
      type:'radio',
      options:['Sí','No'],
      help:['El evento cardiovascular significa infarto de miocardio, ataque cardíaco, insuficiencia cardíaca congestiva, enfermedades valvulares, miocardiopatía hipertrófica, ataque isquémico transitorio, accidente cerebrovascular.'],
      answerState: 'stroke'
  },
  {
      question: 'Medicamentos que mejoran la memoria. Marque todas las que apliquen',
      type:'checkbox',
      options:['Aricept (Nombre genérico: donepezil)','Exelon (Nombre genérico: rivastigmina)','Razadyne (Nombre genérico: galantamina)','Namenda (Nombre genérico: memantina)', 'None'],
      help:[],
      answerState: 'medications',
      answerState2: 'list'
  },
  {
      question: '¿Has tomado alguno de los medicamentos antes citados por mas de 10 semanas?',
      type:'radio',
      options:['Sí','No'],
      help:['Si actualmente está tomando medicamentos, la mayoría de los ensayos clínicos requieren que los tome durante al menos 10 semanas antes de participar en el ensayo.'],
      answerState: 'medications',
      answerState2: 'acceptableTime'
  },
  {
      question: '¿Tiene algún familiar / cuidador disponible para que lo acompañe durante las visitas de prueba?',
      type:'radio',
      options:[ 'Sí','No'],
      help: ['Un cuidador es un miembro de la familia o un ayudante pagado que cuida regularmente a una persona enferma, discapacitada o anciana.', 
      
      'Los investigadores quieren asegurarse de que los participantes en los ensayos clínicos se sientan seguros en todo momento. Por lo tanto, la mayoría de los ensayos clínicos requieren que el participante tenga un cuidador para ayudar a responder preguntas y proporcionar transporte.'],
      answerState: 'informant'
  },
  {
      question: '¿Tienes algun médico de atención primaria?',
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
      question:"¿Por qué está usando esta aplicación? Marque todo lo que aplique.",
      type:'checkbox',
      options:["Antecedentes familiares de la enfermedad de Alzheimer","Interesado en la investigación clínica","Problemas dse memoria","Otro"],
      help:[],
      answerState: 'opinion',
      answerState2: 'list'
  },
  {
      question:"Por favor escribe su razón.",
      type:'textarea',
      options:'',
      help:[],
      answerState: 'opinion',
      answerState2: 'otherText'
  } 
]

export default questionaire;