export default function SetupMenu(props) {
  return (
    <div
      className="setup-container"
    >
      <h1>Quizzical</h1>
      <div className="question-configuration">
        <h2>Question preferences</h2>
        <div className="preference-wrapper">
          <label htmlFor="amount">Amount</label>
          <input
            onChange={props.handleChange}
            onBlur={props.checkRange}
            className="amount preference"
            name="amount"
            id="amount"
            type="number"
            placeholder="1 - 15"
            value={props.questionParameters.amount}
            min="5"
            max="15"
          />
        </div>
        <div className="preference-wrapper">
          <label htmlFor="category">Category</label>
          <select
            onChange={props.handleChange}
            className="select-category preference preference--select"
            name="category"
            id="category"
            value={props.questionParameters.category}
          >
            <option value="27">Animals</option>
            <option value="31">Anime & Manga</option>
            <option value="10">Books</option>
            <option value="18">Computers</option>
            <option value="11">Film</option>
            <option value="">General knowledge</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="19">Mathematics</option>
            <option value="12">Music</option>
            <option value="17">Science & Nature</option>
            <option value="21">Sports</option>
            <option value="28">Vehicles</option>
            <option value="15">Video Games</option>
          </select>
          <span className="custom-arrow"></span>
        </div>
        <div className="preference-wrapper">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            onChange={props.handleChange}
            className="select-difficulty preference preference--select"
            name="difficulty"
            id="difficulty"
            value={props.questionParameters.difficulty}
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <span className="custom-arrow"></span>
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

// Type causes a heck of a lot of issues
// <div className="preference-wrapper">
//   <label htmlFor="type">Type</label>
//   <select
//     onChange={props.handleChange}
//     className="select-difficulty preference preference--select"
//     name="type"
//     id="type"
//     value={props.questionParameters.type}
//   >
//     <option value="">Any</option>
//     <option value="multiple">Multiple Choice</option>
//     <option value="boolean">True/False</option>
//   </select>
//   <span className="custom-arrow"></span>
// </div>
