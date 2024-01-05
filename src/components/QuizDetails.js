import { useState, useEffect } from "react";


const QuizDetails = () => {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuiz = async () => {
    try {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=boolean"
      );
      const data = await response.json();
      console.log(data.results);

      if (data.results && data.results.length > 0) {
        setQuizData(data.results);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswerClick = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      {quizData.length > 0 ? (
        <div>
          <h2 className="quiz-header">{quizData[0].category}</h2>
          <p className="quiz-info">Number of Questions: {quizData.length}</p>
          {quizData.map((question, index) => (
            <div key={index} className="question-container">
              <p className="question-text">{question.question}</p>
              <div className="answer-buttons">
                <button className="answer-button" onClick={() => handleAnswerClick(index, "True")}>
                  True
                </button>
                <button className="answer-button" onClick={() => handleAnswerClick(index, "False")}>
                  False
                </button>
              </div>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
          {showResults && (
            <div className="results-container">
              <h3 className="results-header">Results</h3>
              <p className="score-text">Your Score: {score}/{quizData.length}</p>
              {quizData.map((question, index) => (
                <div key={index} className="question-result">
                  <p className="question-text">{question.question}</p>
                  <p className={`answer-text ${userAnswers[index] === question.correct_answer ? 'correct' : 'incorrect'}`}>
                    Your Answer: {userAnswers[index]}
                  </p>
                  <p className="answer-text">Correct Answer: {question.correct_answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading quiz details...</p>
      )}
    </div>
  );
};

export default QuizDetails;
