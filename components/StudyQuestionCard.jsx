import React, { useState, useEffect } from 'react';

export default function StudyQuestionCard({ questionData }) {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(false);
    setSelectedChoices([]);
  }, [questionData]);

  const toggleChoice = (index) => {
    if (selectedChoices.includes(index)) {
      setSelectedChoices(selectedChoices.filter((i) => i !== index));
    } else {
      setSelectedChoices([...selectedChoices, index]);
    }
  };

  const revealSolution = () => {
    setReveal(true);
  };

  const getChoiceClass = (choice, index) => {
    if (!reveal) return '';

    if (choice.isCorrect) {
      return 'correct';
    } else if (!choice.isCorrect && selectedChoices.includes(index)) {
      return 'incorrect';
    }
    return '';
  };

  return (
    <div className="question-card">
      <h2>{questionData.question}</h2>
      {questionData.image && <img src={questionData.image} alt="question visual" />}

      <div className="choices">
        {questionData.choices.map((choice, index) => (
          <div key={index} className={`choice-item ${getChoiceClass(choice, index)}`}>
            <label>
              <input
                type="checkbox"
                checked={selectedChoices.includes(index)}
                onChange={() => toggleChoice(index)}
                disabled={reveal}
              />
              {choice.text}
            </label>
          </div>
        ))}
      </div>

      <button onClick={revealSolution}>Reveal Solution</button>

      {reveal && (
        <div className="explanation">
          <p>{questionData.explanation}</p>
          {questionData.explanationImage && (
            <img 
              src={questionData.explanationImage}
              alt="explanation visual" 
              className="explanation-image" 
            />
          )}
        </div>
      )}
    </div>
  );
}


