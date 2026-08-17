import React from 'react'
import Header from './components/Header'
import { useEffect, useReducer } from 'react';
import Loader from './components/Loader';
import Error from './components/Error';
import Main1 from './components/Main1';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions:[],

  // 'loading','error','active','ready','finished'
  status:'loading',
  index:0
}


function reducer(state,action){

  switch(action.type){
    case 'dataReceived':
      return {...state,questions:action.payload,status:'ready'}
    case 'dataFailed':
      return {...state,status:'error'}
    case 'start':
      return {...state,status:'active'}

    default:
      throw new Error("unknown action")
  }

}


export default function App() {

  const [{questions,status,index},dispatch] = useReducer(reducer,initialState);

  const numQuestions = questions.length;

  useEffect(function(){

    async function fetchData(){
      
      try{
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({type:'dataReceived', payload:data})

        

      }catch(err){
             dispatch({type:'dataFailed'});
      }finally{

      }
      

    }
    fetchData();

  },[])


  return (
    <div className="app">
      <Header/>
      <Main1>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'loading' && <Loader/>}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <Question question={questions[index]}/>}
      </Main1>
      
    </div>
  )
}
