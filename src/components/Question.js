//component displaying quiz questions
//presentation component

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Grid, Button, Typography, Paper, Card, CardContent} from '@material-ui/core';

function Question(props){
    var question = props.content;
    if(question.indexOf("|")>0)
    {
        var sub = question.substring(question.indexOf("|")+1);
        var question= question.substring(0,question.indexOf("|")-1);
    }
    return (

        <Fragment>
            <Typography variant="h2" gutterBottom align="center">
                {question}
			</Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                {sub}
			</Typography>
        </Fragment>
    );
}


Question.propTypes ={
    content: PropTypes.string.isRequired
};

export default Question;