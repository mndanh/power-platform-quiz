import React, { useState } from 'react';
import '../src/styles/App.css';

const DragAndDrop = () => {
  const questions = [
    {
      question: 'You are modifying a model-driven app for a bicycle company. The app modifications must meet the following requirements.',
      requirements: [
        { id: 1, text: 'Calculate payments', correctAction: 'Configure an out-of-box feature' },
        { id: 2, text: 'A pop-up box must appear', correctAction: 'Edit XML' }
      ],
      actions: [
        { id: 1, text: 'Customize the app' },
        { id: 2, text: 'Configure an out-of-box feature' },
        { id: 3, text: 'Edit XML' }
      ],
      correctAnswers: ['Calculate payments => Configure an out-of-box feature', 'A pop-up box must appear => Edit XML']
    },
    {
      question: 'Choose all of the colors of the rainbow.',
      requirements: Array(7).fill({ id: null, text: 'Drop color here', correctAction: null }),
      actions: [
        { id: 1, text: 'Red' },
        { id: 2, text: 'Blue' },
        { id: 3, text: 'Yellow' },
        { id: 4, text: 'Green' }
      ],
      correctAnswers: ['Red', 'Yellow', 'Green']
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState(questions.map(q => Array(q.requirements.length).fill(null)));

  const currentQuestion = questions[currentQuestionIndex];

  const onDragStart = (item, index) => {
    window.event.dataTransfer.setData('text/plain', JSON.stringify({ item, index }));
  };

  const onDrop = (slotIndex) => {
    const data = JSON.parse(window.event.dataTransfer.getData('text/plain'));
    const draggedItem = data.item;
    const itemIndex = data.index;

    let newAnswerSlots = [...answers[currentQuestionIndex]];
    newAnswerSlots[slotIndex] = draggedItem;

    const newDraggableItems = currentQuestion.actions.filter((_, i) => i !== itemIndex);

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = newAnswerSlots;
      return newAnswers;
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onReset = () => {
    setAnswers(questions.map(q => Array(q.requirements.length).fill(null)));
    setRevealed(false);
  };

  const handleRevealAnswer = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRevealed(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setRevealed(false);
    }
  };

  return (
    <div className="quiz-page">
      <h2 className="page-title">{currentQuestion.question}</h2>
      
      <div className="dnd-container">
        <div className="options-container">
          <h3>Available Actions</h3>
          {currentQuestion.actions.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => onDragStart(item, index)}
              className="choice-item choice-text"
            >
              {item.text}
            </div>
          ))}
        </div>

        <div className="answer-slots">
          <h3>Drop Here</h3>
          {currentQuestion.requirements.map((slot, index) => (
            <div
              key={index}
              onDrop={() => onDrop(index)}
              onDragOver={onDragOver}
              className="answer-slot"
            >
              {answers[currentQuestionIndex][index] ? answers[currentQuestionIndex][index].text : slot.text}
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous Question</button>
        <button onClick={handleRevealAnswer}>Reveal Answer</button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next Question</button>
      </div>

      {revealed && (
        <div className="solution-section">
          <h3>Correct Answers:</h3>
          {currentQuestion.correctAnswers.map((answer, index) => (
            <div key={index}>
              {answer}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
