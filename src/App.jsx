import { useState, useEffect } from 'react'
import Question from './Components/Question'
import { nanoid } from 'nanoid'
import "./App.css"

function App() {
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    const triviaUrl = 'https://opentdb.com/api.php?amount=5'
    fetch(triviaUrl)
      .then(res => res.json())
      .then(data => {
        const questionObjects = data.results.map(item => {
          const answers = [...item['incorrect_answers']].map(answer => ({
            answer: answer,
            isCorrect: false
          }))

          answers.push({
            answer: item['correct_answer'],
            isCorrect: true
          })

          return {
            question: item.question,
            answers: answers
          }
        })

        setQuestions(questionObjects)
      })
  }, [])
  // Data from API: array of objects containing: question, incorrectAnswers and correctAnswer
  // map over the objects and create new objects of the parameters question and answers array
  // answers array contains objects that have two parameters: answer and isCorrect

  const questionElements = questions.map(questionObject => (
    <Question
      key={nanoid()}
      question={questionObject.question}
      answers={questionObject.answers}
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
