import React from 'react'
import IntroPage from './IntroPage'
import FAQ from './QuestionBody/FAQ'
// import '../../css/Main.css'

const Main = () => {
    return (
        <div className='Main'>
            <IntroPage />
            <FAQ/>
        </div>
    )
}

export default Main