//compnent that display answer options
//presentation component

import React from 'react';
import PropTypes from "prop-types";
import AnswerOption from "./AnswerOption";


function AnswerInput(props){

    function renderRadioInputOption(data){
        return(
            <AnswerOption 
                key={data}
                inputClassName='radioInput'
                labelClassName={props.questionId === 3 ? "radioLabel" : props.questionId === 4 ? "radioLabel2" : "radioLabel3"}
                answerContent={data}
                inputType={props.answerInputType}
                groupName="radioGroup"
                currAnswer={props.currAnswer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />
        )
       
    }

    function renderCheckboxInputOption(data){
        return(
            <AnswerOption 
                key={data}
                inputClassName='checkCustomButton'
                labelClassName="checkCustomLabel"
                answerContent={data}
                inputType={props.answerInputType}
                groupName={data}
                currAnswer={props.currAnswer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />

        );
    }
    
    function renderMultiTextInputOption(data){
        return(
            <AnswerOption 
                key={data}
                inputClassName='textCustomInput'
                labelClassName="textCustomLabel"
                answerContent={data}
                inputType={props.answerInputType}
                groupName={data}
                currAnswer={props.curAnswer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
                onTextChange={props.onTextChange}
            />

        );
    }


    function determineInputType(type){
       
        switch(type){
            case "text":
                if(typeof props.answerOptions ==='string')
                {
                    
                    return(
                        <input type="text" name={props.questionId} value={props.currAnswer} onChange={props.onTextChange} ref={input => input && input.focus()}/>
                    );
                }else
                {
                    return(
                        <ul className="answerOptions">
                        {props.answerOptions.map(renderMultiTextInputOption)}
                        </ul>
                    );
                }

            case "radio":
                return(
                
                    <ul className="answerOptions">
                        {props.answerOptions.map(renderRadioInputOption)}
                    </ul> 
                            
                );
            case "checkbox":
                return(
                
                    <ul className="answerOptions">
                        {props.answerOptions.map(renderCheckboxInputOption)}
                    </ul> 
                            
                );
            case "textarea":
                if(typeof props.answerOptions ==='string')
                {
                    console.log("calling renderTextarea()");
                    return(
                        <ul className="answerOptions">
                             <textarea 
                             className="reasonTextArea"
                            name="textarea" 
                            placeholder="Please write down your reason(s)."
                            value={props.currAnswer}
                            onChange={props.onTextChange} 
                            autoFocus></textarea>
                        </ul>
                    );
                }
                    
            default:
                return (<p>no input type</p>);

        }
    }
    

    return(
      
        
        // if({props.answerInputType} === 'text'){
        //     renderTextInput();
        // }
       // <input type="text" id="age" name="age"/>
       <div className="answerInput">{determineInputType(props.answerInputType)}</div>

    );
}

AnswerInput.propTypes={
    answerInputType: PropTypes.string.isRequired,
    // answerContent: PropTypes.string.isRequired,
    //currAnswer: PropTypes.string.isRequired,
   onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerInput;