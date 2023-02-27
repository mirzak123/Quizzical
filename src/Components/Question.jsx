import { nanoid } from 'nanoid'

export default function Question(props) {
  function decodeHtmlEntities(encodedString) {
    // Decodes strings containing html entities allowing them to display as symbols
    // Needed because 'opentdb' API returns string with html entities
    // Code from ChatGPT
    const parser = new DOMParser();
    const decodedDoc = parser.parseFromString(encodedString, 'text/html');
    return decodedDoc.documentElement.textContent;
  }

  props.answers.sort(() => Math.random() - 0.5)

  const answerElements = props.answers.map(answer => {
    return (
      <div key={nanoid()} className={`possible-answer ${answer.isCorrect ? "correct" : ""}`}>
        {answer.answer}
      </div>
    )
  })

  return (
    <div className="question-container">
      <h2 className="question">{decodeHtmlEntities(props.question)}</h2>
      <div className="possible-answers-container">
        { answerElements }
      </div>
    </div>
  )
}
