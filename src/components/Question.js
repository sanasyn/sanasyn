//component displaying quiz questions
//presentation component

import React from 'react';
import PropTypes from 'prop-types';

function Question(props){
    var question = props.content;
    if(question.indexOf("(")>0)
    {
        var sub = question.substring(question.indexOf("(")-1);
        var question= question.substring(0,question.indexOf("(")-1);
    }
    return (
        <div>
        <h2 className="question">{question}</h2>
        <span className="subtext">{sub}</span>
        </div>
    );
}


Question.propTypes ={
    content: PropTypes.string.isRequired
};

export default Question;