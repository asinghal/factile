const questionTypes = [
    { name: 'Single Choice', value: 'radio', options: true, dimensions: false },
    { name: 'Dropdown', value: 'dropdown', options: true, dimensions: false },
    { name: 'Multiple Choice', value: 'checkbox', options: true, dimensions: false },
    { name: 'Ranking', value: 'ranking', options: true, dimensions: false },
    { name: 'Rating Scale', value: 'rating', options: true, dimensions: true },
    { name: 'Text Field', value: 'textbox', options: false, dimensions: false },
    { name: 'Large Text/ Essay', value: 'textarea', options: false, dimensions: false },
    { name: 'Plain Text', value: 'plaintext', options: false, dimensions: false },
    { name: 'PageBreak', value: 'page', options: false, dimensions: false }
];

export { questionTypes };
