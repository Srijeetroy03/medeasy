import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
// import '../../../css/Questions.css'
const Questions = (props) => {
    return (
        <div className='Questions'>
            <p>{props.text}</p>
            <button><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)'/></button>
        </div>
    )
}

export default Questions
