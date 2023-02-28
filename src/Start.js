import React from 'react'

export default function Start(props) {

    return(
        <section className="start-section">
            <h1 className="main-title">Quizzical</h1>
            <p className="main-description">Open Trivia Database Api project</p>
            <button className="start-btn" onClick={props.showQuiz}>Start quiz</button>
        </section>
    )
}