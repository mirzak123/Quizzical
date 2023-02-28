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

  const answerElements = props.answers.map(answer => {
    const styles = {
      backgroundColor: answer.isSelected ? '#D6DBF5' : '#F5F7FB'
    }

    const shownStyles = {
      backgroundColor: (
        answer.isCorrect ?
          '#94D7A2' :
          answer.isSelected ?
            '#F8BCBC' :
            '#F5F7FB'
      ),
      opacity: props.showAnswers && !answer.isCorrect ? '.65' : '1'
    }

    return (
      <div
        key={nanoid()}
        className={`possible-answer ${answer.isCorrect ? "correct" : ""}`}
        onClick={!props.showAnswers ? () => props.toggleAnswer(props.id, answer.answer) : null}
        style={props.showAnswers ? shownStyles : styles}
      >
        {decodeHtmlEntities(answer.answer)}
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
