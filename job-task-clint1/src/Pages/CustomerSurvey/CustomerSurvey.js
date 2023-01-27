import React, { useEffect, useState } from 'react';
import './CoustomerSurvey.css'
import Button from 'react-bootstrap/esm/Button';
import { useQuery } from '@tanstack/react-query';
import  Form  from 'react-bootstrap/Form';
import Options from './Options';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CustomerSurvey = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [serSelectData, setSerSelectData] = useState([]);
    const [loader, setLoader] = useState(false)
    const Navigate = useNavigate();


    // load all question
    
    const { data: Question = [], refetch, isLoading } = useQuery({
        queryKey: ['https://job-task-server-blond.vercel.app/allQuestions'],
        queryFn: async () => {
            const res = await fetch(`Question.json`)
            const data = await res.json();
            return data;
        }
    });


    const question = Question[currentQuestion]; 


    // next button target
    const HandelNext = () =>{

        if(currentQuestion === 4){
            return;
        }
        setCurrentQuestion(currentQuestion+1);

    }


    // previous button target 
    const HandelPrevious = () =>{
        if(currentQuestion === 0){

            return
        }
        setCurrentQuestion(currentQuestion-1);
    }


    // question data select 
    const HandelSelected = (selectedQuestion, slot) =>{
        if(currentQuestion === 4){
            return;
        }
        setSerSelectData([...serSelectData, {Question:selectedQuestion, Slot:slot}]);
        setCurrentQuestion(currentQuestion+1);

    }

    // question data save in server

    const HandelSubmit = () =>{



        fetch(`https://job-task-server-blond.vercel.app/customerSurvey`, {
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify({...serSelectData})

    })
    .then(res => res.json())
    .then(data => {
        if(data.acknowledged){
            setLoader(false);
            toast.success('Your customer Survey successfully add');
            Navigate('/')
            refetch();
        }
    })
    .catch(err => {
        toast.error(err.message);
        setLoader(false)
    });
  
    }


    // question input field 
    const handelWrite = (e) =>{
        const answer = e.target.value;
        setSerSelectData([...serSelectData, {Question:question.questionTitle, Slot:answer}]);
    }
    if(isLoading){
        return(<h1 className='text-5xl text-red text-center'>Loading...</h1>)
     }

     
     
     

     
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <div className="box p-5" >
                <h2 className='text-bold mb-3'>Question {currentQuestion+1}/5</h2>
                    <h3>{question.questionTitle} </h3>

                    <div className="row my-4">
                        {
                            !question.Options ?  <Form.Control type="text" onBlur={handelWrite} placeholder="Write Answer" /> 
                                        : question.Options.map((option, i) =><Options option={option} question={question} HandelSelected={HandelSelected} /> )
                        }
                            
                    </div>


                    <div className="buttons mt-3">
                        <Button variant="primary px-3 py-2 me-3" onClick={HandelPrevious}>Previous</Button>
                        {
                            currentQuestion === Question.length-1? 
                            <Button variant="success px-3 py-2" onClick={HandelSubmit}>Submit</Button>
                            :<Button variant="success px-3 py-2" onClick={HandelNext}>Next</Button>

                        }
                    </div>

            </div>
        </div>
    );
};

export default CustomerSurvey;