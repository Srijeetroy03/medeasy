import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/FAQ.css'

import Questions from './Questions'

let question_text = [
    "How do I know if I'm unwell?",
    "What are some warning signs of mental illness?",
    "What can cause mental health problems?",
]

const FAQ = () => {
    let count=100
    return (
        <div className='FAQ'>
            <h1>Frequently asked Questions</h1>
            {
                question_text.map(
                    (question) => (
                        <Questions key={count++} text={question} />
                    )
                )
            }
            <div className='ask_melly_questions_container'>
                <h1 className='other_questions'>Didn’t find answers to your questions?</h1>
                <div className="melly_button">
                    <Link to='/melly' style={{ textDecoration: 'none' }}><button>Talk to Melly</button></Link>
                </div>

            </div>

        </div>
    )
}

export default FAQ
