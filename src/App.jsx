
import { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu';
import Quiz from './components/Quiz';


function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [check, setCheck] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [count, setCount] =useState(0)
  

  function start() {
    setStartQuiz(prevStart => !prevStart)
  }

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);


  useEffect( () => {
    async function getQuestions() {
      
       const res = await fetch("https://the-trivia-api.com/api/questions?limit=5")
       const data = await res.json()
       if (data) {
         let q = []
         data.forEach(question => {
           q.push({id:question.id, answers:shuffleArray([...question.incorrectAnswers, question.correctAnswer]), question:question.question, correct:question.correctAnswer, selected: null, checked:false})
          })
          
          
        setQuestions(q)
       } else {
          console.error("API returned unexpected response",data)
       }
      
    }
     getQuestions()
    
  }, [count])


  
  function clickAnswers(id, answers) {
      setQuestions(prevQuestions => prevQuestions.map(question =>{
        return question.id === id ? {...question, selected:answers} : question
      }))
    }
    
    function handleCheck(){
      let selected = true
      questions.forEach(question =>{
        if (question.selected === null){
          selected = false
          return
        }
      })
      if (!selected){
        return
      }
      setQuestions(questions => questions.map(question => {
        
        return {...question, checked:true}
      }))
      setCheck(true)
      let correct = 0
      questions.forEach(question =>{
        if (question.correct === question.selected){
          setCorrect(correct +=1)
        }
      })
    
    }
  

  const questionsElements = questions.map(question => {
    return(
      <Quiz key={question.id} question={question} id={question.id} clickAnswers={clickAnswers}/>
      
    )
  })

  function togglePlayAgain() {
    setCount(prevCount => prevCount + 1)
    setCheck(false)
    
  }

  function introPage() {
    setStartQuiz(false)
    window.location.reload()
  }


 

   return (
    <>
    {  startQuiz ? 
          <div>
            <div className='blob_yellow-mini'/>
            {questionsElements}
            <div className='scoreCheck_wrapper'>
              {check && <span className='score'>Your score is {correct}/5 answers</span>}
             <button className='check' onClick={check ? togglePlayAgain : handleCheck}>{check ? "Play again" : "Check answers"}</button>
            </div>
             { check && <div onClick={introPage} className='cross'><i class="uil uil-times"></i></div>}
            <div className='blob_blue-mini'/>
          </div>

        :
        <div>
         <div className='blob-yellow'/>
         <Menu handleClick={start}/>
         <div className='blob-blue'/>
         </div> 
         
   }
   </>
  );
};

export default App;

