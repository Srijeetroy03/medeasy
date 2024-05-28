import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import '../../../styles/Questions.css'
const Questions = (props) => {
    const[showAnswer, setshow]=useState(false)

    return (
        
        <div className='Questions'>
            <p>{props.text}</p>
            <button><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)' /></button>
            
        </div>
    )
}

export default Questions
