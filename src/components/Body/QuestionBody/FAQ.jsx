import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/FAQ.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import '../../../styles/Questions.css'

let question_text = [
    "How do I know if I'm unwell?",
    "What are some warning signs of mental illness?",
    "What can cause mental health problems?",
]

let answer_text=[
    "Recognizing if you're unwell involves paying attention to a combination of physical, mental, and emotional symptoms. Common physical signs include persistent fatigue, unusual aches or pains, fever, changes in appetite or weight, and digestive issues. Mentally, you might experience confusion, forgetfulness, or a lack of focus. Emotionally, unwellness can manifest as prolonged sadness, anxiety, irritability, or a feeling of being overwhelmed. It's important to notice if these symptoms deviate from your normal state and persist over time. If you're unsure, consulting with a healthcare professional can provide clarity and guidance.",

    "Warning signs of mental illness include significant changes in mood, behavior, or personality that persist over time. These can manifest as prolonged feelings of sadness or irritability, excessive anxiety or fear, withdrawal from social activities, and a noticeable drop in performance at work or school. Other signs include drastic changes in sleep patterns, appetite, or energy levels, as well as difficulty concentrating, making decisions, or coping with daily stress. Additionally, experiencing delusions, hallucinations, or thoughts of self-harm or suicide are critical warning signs. Recognizing these symptoms early and seeking professional help is essential for effective management and treatment.",

    "Mental health problems can be caused by a complex interplay of genetic, biological, environmental, and psychological factors. Genetic predisposition can make individuals more vulnerable, while biochemical imbalances in the brain can influence mood and behavior. Environmental factors such as traumatic experiences, chronic stress, abuse, and exposure to violence can trigger or exacerbate mental health issues. Additionally, significant life changes, social isolation, and a lack of support systems can contribute. Psychological factors, including personality traits and coping mechanisms, also play a role. Understanding that these factors are interconnected helps in addressing mental health comprehensively."

]

const FAQ = () => {
    const[ansStatus, setansStatus]=useState(false)
    const[ansStatus1, setansStatus1]=useState(false)
    const[ansStatus2, setansStatus2]=useState(false)

    return (
        <div className='FAQ'>
            <h1>Frequently asked Questions</h1>
            <div className='Questions'>
                <p>{question_text[0]}</p>
                {
                    (ansStatus)?(
                        <>
                        <button onClick={()=>{setansStatus(false)}}><FontAwesomeIcon icon={faCaretUp} color='rgb(117, 119, 123)'  /></button>
                        </>
                    ):(
                        <button onClick={()=>{setansStatus(true)}}><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)' /></button>
                    )
                }
            </div>
            <div className='Answers'>
                {
                    (ansStatus)?(<p>{answer_text[0]}</p>):null
                }
                
            </div>
            <div className='Questions'>
                <p>{question_text[1]}</p>
                {
                    (ansStatus1)?(
                        <>
                        <button onClick={()=>{setansStatus1(false)}}><FontAwesomeIcon icon={faCaretUp} color='rgb(117, 119, 123)'  /></button>
                        </>
                    ):(
                        <button onClick={()=>{setansStatus1(true)}}><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)' /></button>
                    )
                }
            </div>
            <div className='Answers'>
                {
                    (ansStatus1)?(<p>{answer_text[1]}</p>):null
                }
                
            </div>
            <div className='Questions'>
                <p>{question_text[2]}</p>
                {
                    (ansStatus2)?(
                        <>
                        <button onClick={()=>{setansStatus2(false)}}><FontAwesomeIcon icon={faCaretUp} color='rgb(117, 119, 123)'  /></button>
                        </>
                    ):(
                        <button onClick={()=>{setansStatus2(true)}}><FontAwesomeIcon icon={faCaretDown} color='rgb(117, 119, 123)' /></button>
                    )
                }
            </div>
            <div className='Answers'>
                {
                    (ansStatus2)?(<p>{answer_text[2]}</p>):null
                }
                
            </div>
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
