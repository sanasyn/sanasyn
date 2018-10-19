//compnent that display answer options
//presentation component

import React from 'react';
import PropTypes from "prop-types";
import questionaire from '../utils/questionaire';
import questionaireSpanish from '../utils/questionaireSpanish';
import AnswerOption from "./AnswerOption";


function AnswerInput(props){
    function renderMultipleChoice(data){
        return(
            <AnswerOption 
                key={data}
                answerContent={data}
                currAnswer={props.currAnswer}
                questionId={props.questionId}
            />
        )   
    }

    function renderTextInputOption(){
        return(
            <AnswerOption 
                currAnswer={props.currAnswer}
                questionId={props.questionId}
                disableActive={props.disableActive}
            />
        );
    }

    function determineInputType(type){
       let questionaireVersion = props.language === 'spanish' ? questionaireSpanish : questionaire;
        switch(type){
            case "text":
                    return(
                        <ul className="answerOptions">
                            {renderTextInputOption()}
                        </ul>
                    );

            case "radio":
                return(
                    <ul className="answerOptions">
                        {questionaireVersion[props.questionId].options.map((option) => renderMultipleChoice(option))}
                    </ul> 
                            
                );
            case "checkbox":
                return(
                
                    <ul className="answerOptions">
                        {questionaireVersion[props.questionId].options.map((option) => renderMultipleChoice(option))}
                    </ul> 
                            
                );
            case "textarea":
                return(
                    <ul className="answerOptions">
                        {renderTextInputOption()}
                    </ul>
                );
            default:
                return (<p>no input type</p>);
        }
    }
    

    return(
       <div className="answerInput">{determineInputType(questionaire[props.questionId].type)}</div>
    );
}

AnswerInput.propTypes={
    // answerInputType: PropTypes.string.isRequired,
    // answerContent: PropTypes.string.isRequired,
    //currAnswer: PropTypes.string.isRequired,
//    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerInput;