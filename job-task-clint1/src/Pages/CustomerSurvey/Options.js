import React, { Fragment } from 'react';
import  Form  from 'react-bootstrap/Form';

const Options = ({option, question, HandelSelected}) => {
    return (
        <Fragment>
        {
            <div className="col-lg-4 col-md-4 col-sm-4">
            <h1 className='text-white bg-info' 
            style={{cursor: 'pointer'}} onClick={()=>HandelSelected(question.questionTitle,option)}>{option}</h1>
         </div>
        }
        
        </Fragment>
    );
};

export default Options;