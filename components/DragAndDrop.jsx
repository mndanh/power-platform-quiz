import React, { useState } from 'react';
import '../src/styles/App.css';

const DragAndDrop = () => {
  const [draggableItems, setDraggableItems] = useState([
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' },
  ]);

  const [answerSlots, setAnswerSlots] = useState(Array(3).fill(null));

  const onDragStart = (index) => {
    // Set the index of the item being dragged
    const dataTransfer = window.event.dataTransfer;
    dataTransfer.setData('text/plain', index);
  };

  const onDrop = (index) => {
    // Handle dropping the draggable item into an answer slot
    const draggedItemIndex = window.event.dataTransfer.getData('text/plain');
    const newAnswerSlots = [...answerSlots];
    newAnswerSlots[index] = draggableItems[draggedItemIndex];
    setAnswerSlots(newAnswerSlots);
  };

  return (
    <div className="quiz-page">
      <h2 className="page-title">Drag and Drop Quiz</h2>
      <div className="dnd-container">
        <div className="options-container">
          {draggableItems.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(index)}
              className="choice-item choice-text"
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="answer-slots">
          {answerSlots.map((slot, index) => (
            <div
              key={index}
              onDrop={() => onDrop(index)}
              onDragOver={(e) => e.preventDefault()} // Prevent default to allow dropping
              className="answer-slot"
            >
              {slot ? slot.text : 'Drop here'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;

