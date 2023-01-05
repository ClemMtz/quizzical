import React from 'react'

function Menu(props) {
  return (
    <div className='quiz_introPage-wrapper'>
        <h1 className='quiz_title'>Quizzical</h1>
        <button onClick={props.handleClick} className='quiz_button'>Start Quiz</button>
    </div>
  )
}

export default Menu