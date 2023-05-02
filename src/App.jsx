import { useState, useEffect } from 'react'
import Question from './Components/Question'
import SetupMenu from './Components/SetupMenu'
import { nanoid } from 'nanoid'
import "./App.css"

function App() {
  const [questions, setQuestions] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [showSetup, setShowSetup] = useState(true)
  const [questionParameters, setQuestionParameters] = useState({
    amount: "",
    category: "",
    difficulty: "",
    type: "",
  })

  function getUrl() {
    const url = "https://opentdb.com/api.php?amount="
      // if there is a set value for difficulty and category add it to the url
      + `${questionParameters.amount ? `${questionParameters.amount}` : '5'}`
      + `${questionParameters.category ? `&category=${questionParameters.category}` : ''}`
      + `${questionParameters.difficulty ? `&difficulty=${questionParameters.difficulty}` : ''}`
      // + `${questionParameters.type ? `&type=${questionParameters.type}` : ''}`

    return url
  }

  async function getNewQuestions() {
    const triviaUrl = getUrl()
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
    getNewQuestions().then(data => { setQuestions(data) })
  }, [])

  function checkRange() {
    const inputField = document.querySelector('.amount')
    const amount = Number(questionParameters.amount)
    if (amount > Number(inputField.max)) {
      questionParameters.amount = inputField.max
    }
    else if (inputField.value < Number(inputField.min)) {
      questionParameters.amount = inputField.min
    }
  }

  function startGame() {
    checkRange()
    getNewQuestions().then(data => setQuestions(data))
    setShowAnswers(false)
    setShowSetup(false)
  }

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

  useEffect(() => {
    window.scrollTo(0, showAnswers ? document.body.scrollHeight : 0);
  }, [showAnswers])

  function checkAnswers() {
    setShowAnswers(true)
  }
  
  function countCorrectAnswers() {
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

  function handleChange(event) {
    const { name, value } = event.target;
    setQuestionParameters(prevParameters => {
      return {
        ...prevParameters,
        [name]: value
      }
    })
  }

  return (
    <main className="quizzical">
      {
        showSetup ?
          <SetupMenu
            startGame={startGame}
            questionParameters={questionParameters}
            handleChange={handleChange}
            checkRange={checkRange}
          /> :
          <div>
            <div className="quizzical-container">
              { questionElements }
            </div>
            <div className="quizzical-container__controller">
              {
                showAnswers ?
                  <>
                    <h2 className="score">You scored {countCorrectAnswers()}/{questionParameters.amount} correct answers</h2>
                    <div className="button-container">
                      <button
                        className="button button--inverted"
                        onClick={() => setShowSetup(true)}
                      >
                        Restart
                      </button>
                      <button
                        className="button"
                        onClick={resetGame}
                      >
                        Play again
                      </button>
                    </div>
                  </> :
                  <button
                    className="button button--check-answers"
                    onClick={checkAnswers}
                  >
                    Check answers
                  </button>
              }
            </div>
          </div>
      }
    </main>
  )
}

export default App
