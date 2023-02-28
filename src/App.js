import React from 'react'
import Start from './Start'
import Questions from './Questions'


export default function App() {

    const [startQuiz, setStartQuiz] = React.useState(true)
    const [questionsData, setQuestionsData] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [complete, setComplete] = React.useState(false)

    function showQuiz() {
        setStartQuiz(false)
    }

    React.useEffect(() => {

        if (startQuiz === false) {
            fetch('https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple')
                .then(resp => resp.json())
                .then(data => setQuestionsData(data.results.map((questionData) => {
                    return({
                        question: questionData.question,
                        // This one sorts the answers to a random order.
                        options: questionData.incorrect_answers.concat([questionData.correct_answer]).map(value => ({value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                        correct_answer: questionData.correct_answer,
                        selected_answer: undefined
                    })
                })))
        }

    },[startQuiz])

    function checkAnswers() {
        setShowAnswers(true)
    }

    function playAgain() {
        setStartQuiz(true)
        setShowAnswers(false)
        setComplete(false)
    }

    function selectAnswer(event, question_id, option_id) {
        setQuestionsData((prev) => {
          return questionsData.map((question, quest_id) => {
            if (question_id === quest_id) {
              return {
                ...question,
                selected_answer: option_id,
              };
            } else {
              return question;
            }
          });
        });
      }

    React.useEffect(() => {
        var count = 0;

        for (var i = 0; i < questionsData.length; i++ ) {
            if (typeof questionsData[i].selected_answer !== 'undefined') {
                if (questionsData[i].options[questionsData[i].selected_answer] === questionsData[i].correct_answer) {
                    count++
                }
            }
            setScore(count)
        }
    }, [showAnswers])

    React.useEffect(() => {
        setComplete(questionsData.every((question) => question.selected_answer !== 'undefined'))
    }, [questionsData])

    const questions = questionsData.map((question, index) => {
        return(
            <Questions
            key={index}
            question={question}
            id={index}
            showAnswers={showAnswers}
            selectAnswer={selectAnswer}
             />
        )
    })
    
    return(
        <main>
            {startQuiz ? <Start showQuiz={showQuiz} /> :
            <div className="quiz-container">
                {questions}
            </div> }
            <span className="up-corner"></span>
            <span className="bottom-corner"></span>
            {showAnswers ? 
                <div className="answer-btn-container">
                    <h4 className="score">{`You scored ${score} out of 5 questions`}</h4>
                    <button className="playagain-btn end-btn"onClick={playAgain}>Play again</button>
                </div> :
                <button className="checkanswers-btn end-btn" disabled={!complete} onClick={checkAnswers}>Check Answers</button>}
        </main>
    )
}