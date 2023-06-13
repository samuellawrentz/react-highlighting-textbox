import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from 'react-contenteditable';
import './styles.scss';

export class HightlightInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { html: props.value || '', word: props.word || '' };
    this.ref = React.createRef();
  }

  handleChange = (evt) => {
    const rg = new RegExp(this.state.word, 'gi');
    const textCopy = this.ref.current.textContent.replace(rg, `<span class="sam-react-highlight-span">${this.state.word}</span>`);
    this.setState({ html: textCopy });
  };
  componentDidMount() {
    this.handleChange();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.handleChange();
    }
  }

  render = () => {
    return (
      <ContentEditable
        innerRef={this.ref}
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
      />
    );
  };
}
