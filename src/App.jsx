import { useState, useEffect } from 'react'
import Question from './Components/Question'
import { nanoid } from 'nanoid'
import "./App.css"

function App() {
  const [questions, setQuestions] = useState([])
  // maybe needed for win status?
  // const [quizzical, setQuizzical] = useState(false)
  
  useEffect(() => {
    const triviaUrl = 'https://opentdb.com/api.php?amount=5'
    fetch(triviaUrl)
      .then(res => res.json())
      .then(data => {
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

        setQuestions(questionObjects)
      })
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

  const questionElements = questions.map(questionObject => (
    <Question
      key={questionObject.id}
      id={questionObject.id}
      question={questionObject.question}
      answers={questionObject.answers}
      toggleAnswer={toggleAnswer}
    />
  ))

  return (
    <main>
      <div className="quizzical-container">
        { questionElements }
      </div>
    </main>
  )
}

export default App
