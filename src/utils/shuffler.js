/**
 * Utility to shuffle arrays and handle question/option randomization
 * while preserving the correct answer index.
 */

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Shuffles questions AND their internal options.
 * Correct index is updated to match the new position of the original correct answer.
 */
export const shuffleQuestions = (questions) => {
  return shuffleArray(questions).map(q => {
    const originalOptions = [...q.options];
    const originalCorrectIndex = q.correct;
    const correctOptionText = originalOptions[originalCorrectIndex];

    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    };
  });
};
