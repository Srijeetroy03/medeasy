import React from 'react'
import aiBot from '../../Images/aiBot.png'
import '../../css/ChatBot.css'
import Box from './Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

const ChatBot = () => {
    return (
        <div className='ChatBot'>
            <div className='head'>
                <div className='header-text'>
                    <h1><span className='head_span1'>Hello</span> <span className='head_span2'>User!</span></h1>
                    <h1 style={{color:'rgb(200,227,210)'}}>How can i assist you?</h1>
                </div>
                <img src={aiBot} alt="" />
            </div>

            <div className="box_container">
                <Box/>
                <Box/>
                <div className="box3">
                    box
                </div>
            </div>

            <div className="chat_space">
                <input type="text" placeholder='Enter your prompts here'/>
                <FontAwesomeIcon icon={faMicrophone} className='microphone'/>
            </div>

        </div>
    )
}

export default ChatBot
