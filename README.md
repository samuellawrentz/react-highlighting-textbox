# React Highlighting Textbox

Do you want to highlight text in a textbox? This is the component for you! This component is built with React and uses react-contenteditable to add html content with spans that can highlight the text.

## Installation

```bash
npm install react-highlighting-textbox
```

## Usage

```javascript
import React, { Component } from 'react';
import HighlightingTextbox from 'react-highlighting-textbox';

class Example extends Component {
  render() {
    return <HighlightingTextbox />;
  }
}
```

## Props

- `value` - The text to display in the textbox
- `onChange` - A function that is called when the text in the textbox changes
- `word` - The word to highlight
- `className` - The class name to apply to the textbox
- `spanClassName` - The class name to apply to the span that highlights the word
