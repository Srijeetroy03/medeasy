import React from 'react'
import { Link } from 'react-router-dom'
// import '../../../css/FAQ.css'

import Questions from './Questions'

let question_text = [
    "How do I know if I'm unwell?",
    "What are some warning signs of mental illness?",
    "What can cause mental health problems?",
    "Can I use Thenty inside Framer?",
    "Can I use Thenty inside Framer?"
]

const FAQ = () => {
    return (
        <div className='FAQ'>
            <h1>Frequently asked Questions</h1>
            {
                question_text.map(
                    (question) => (
                        <Questions text={question} />
                    )
                )
            }
            <div className='ask_melly_questions_container'>
                <h1 className='other_questions'>Didn’t find answers to your questions?</h1>
                <p>Top 500 firms trust the Fieldguide AI Platform for Advisory & Audit Firms. Learn how Fieldguide can help your firm.</p>
                <div className="melly_button">
                    <Link to='/chatbot' style={{ textDecoration: 'none' }}><button>Talk to Melly</button></Link>
                </div>

            </div>

        </div>
    )
}

export default FAQ
