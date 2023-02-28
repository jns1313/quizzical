import React from 'react'

export default function Questions(props) {

    function styling(option, index) {
        if (props.showAnswers === true) {
            if (props.question.correct_answer === option) {
                return({backgroundColor: '#94D7A2'})
            } else if (props.question.selected_answer === index) {
                return({backgroundColor: '#F8BCBC'})
            } else {
                return({backgroundColor: '#F5F7FB"'})
            }
        } else {
            return(props.question.selected_answer === index ? {backgroundColor: '#D6DBF5'} : {backgroundColor: '#F5F7FB'})
        }
    }

    const options = props.question.options.map((option, index) => <button
        key={index}
        dangerouslySetInnerHTML={{__html: option}}
        style={styling(option, index)}
        className="options-btn"
        onClick={(event) => props.selectAnswer(event, props.id, index)}
        disabled={props.showAnswers}
        />)

    return(
        <div className="quiz-questions">
            <h2 className="question-title" dangerouslySetInnerHTML={{__html: props.question.question}}></h2>
            <div className="question-options">{options}</div>
            <hr className="questions-divider" />
        </div>
    )
}