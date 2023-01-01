import React from 'react'
import { nanoid } from 'nanoid'

function Quiz(props) {
  let answers = props.question.answers 

  function handleClick(answers){
    if(props.question.checked){
       return
   }else {
    props.clickAnswers(props.id, answers)
   }
  }



  const answerElements = answers.map(answer => {
    let id = null
    if(props.question.checked){
      if(props.question.correct === answer) {
        id = 'correct'
      }
      else if (props.question.selected === answer) {
        id = "incorrect"
      }
      else {
        id ="not-selected"
      }
    }
    return (
      <button key={nanoid()} id={id} className={answer === props.question.selected ? "answer selected" : "answer"} onClick={() => handleClick(answer)}>{answer}</button>
      
    )
  })

  return (
    
     <div className='question_container'>
      <h3 className='question_title'>{props.question.question}</h3>
      {answerElements}
     </div>
    
  )
}

export default Quiz