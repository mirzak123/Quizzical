export default function SetupMenu(props) {
  return (
    <div
      className="setup-container"
    >
      <h1>Quizzical</h1>
      <div className="question-configuration">
        <h2>Question preferences</h2>
        <div className="preference-wrapper">
          <label htmlFor="category">Category</label>
          <select
            onChange={props.handleChange}
            className="select-category"
            name="category"
            id="category"
            value={props.questionParameters.category}
          >
            <option value="">General knowledge</option>
            <option value="18">Computers</option>
            <option value="19">Mathematics</option>
            <option value="11">Film</option>
            <option value="10">Books</option>
            <option value="15">Video Games</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
          </select>
        </div>
        <div className="preference-wrapper">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            onChange={props.handleChange}
            className="select-difficulty"
            name="difficulty"
            id="difficulty"
            value={props.questionParameters.difficulty}
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="preference-wrapper">
          <label htmlFor="type">Type</label>
          <select
            onChange={props.handleChange}
            className="select-difficulty"
            name="type"
            id="type"
            value={props.questionParameters.type}
          >
            <option value="">Any</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
      </div>
      <button
        className="button"
        onClick={props.startGame}
      >
        Start quiz
      </button>
    </div>
  )
}
