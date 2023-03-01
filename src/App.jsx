import { useState, useEffect } from 'react'
import Question from './Components/Question'
import { nanoid } from 'nanoid'
import "./App.css"

function App() {
  const [questions, setQuestions] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)

  async function getNewQuestions() {
    const triviaUrl = 'https://opentdb.com/api.php?amount=5'
    const response = await fetch(triviaUrl)
    const data = await response.json()

    const questionObjects = data.results.map(item => {
      // create answer objects from the incorrect answers
      const answers = [...item['incorrect_answers']].map(answer => ({
        answer: answer,
        isCorrect: false,
        isSelected: false
      }))

      // add the correct answer to the answers array
      answers.push({
        answer: item['correct_answer'],
        isCorrect: true,
        isSelected: false
      })

      // shuffle the answers
      answers.sort(() => Math.random() - 0.5)

      return {
        id: nanoid(),
        question: item.question,
        answers: answers
      }
    })

    return questionObjects
  }
  
  useEffect(() => {
    // const triviaUrl = 'https://opentdb.com/api.php?amount=5'
    // fetch(triviaUrl)
    //   .then(res => res.json())
    //   .then(data => {
    //     const questionObjects = data.results.map(item => {
    //       // create answer objects from the incorrect answers
    //       const answers = [...item['incorrect_answers']].map(answer => ({
    //         answer: answer,
    //         isCorrect: false,
    //         isSelected: false
    //       }))
    //
    //       // add the correct answer to the answers array
    //       answers.push({
    //         answer: item['correct_answer'],
    //         isCorrect: true,
    //         isSelected: false
    //       })
    //
    //       // shuffle the answers
    //       answers.sort(() => Math.random() - 0.5)
    //
    //       return {
    //         id: nanoid(),
    //         question: item.question,
    //         answers: answers
    //       }
    //     })
    //
    //     setQuestions(questionObjects)
    //   })

    getNewQuestions().then(data => setQuestions(data))
  }, [])

  function toggleAnswer(questionId, answer) {
    setQuestions(prevQuestions => prevQuestions.map(questionObject => {
      if (questionId === questionObject.id) {
        questionObject.answers.forEach(answerObject => {
          if (answerObject.answer === answer) {
            answerObject.isSelected = !answerObject.isSelected
          }
          else {
            answerObject.isSelected = false
          }
        })
      }
      return questionObject
    }))
  }

  function checkAnswers() {
    setShowAnswers(true)
  }
  
  function getCorrectAnswers() {
    let correctCount = 0
    questions.forEach(questionObject => questionObject.answers.forEach(answer => {
      if (answer.isCorrect && answer.isSelected)
        correctCount++
    }))
    return correctCount
  }

  function resetGame() {
    getNewQuestions().then(data => setQuestions(data))
    setShowAnswers(false)
  }

  const questionElements = questions.map(questionObject => (
    <Question
      key={questionObject.id}
      id={questionObject.id}
      question={questionObject.question}
      answers={questionObject.answers}
      toggleAnswer={toggleAnswer}
      showAnswers={showAnswers}
    />
  ))

  return (
    <main className="quizzical">
      <div className="quizzical-container">
        { questionElements }
      </div>
      <div className="button-container">
        {
          showAnswers ?
            <>
              <h2>You scored {getCorrectAnswers()}/5 correct answers</h2>
              <button
                className="button"
                onClick={resetGame}
              >
                Play again
              </button>
            </> :
            <button
              className="button"
              onClick={checkAnswers}
            >
              Check answers
            </button>
      }
      </div>
    </main>
  )
}

export default App
