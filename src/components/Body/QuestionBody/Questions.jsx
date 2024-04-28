import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import '../../../styles/Questions.css'
const Questions = (props) => {
    return (
        <div className='Questions'>
            <p>{props.text}</p>
            {/* <button><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)'/></button> */}
            <button>Click</button>
        </div>
    )
}

export default Questions
