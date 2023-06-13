import React from 'react';
import ContentEditable from 'react-contenteditable';
import cx from 'classnames';
import './styles.scss';

export class HightlightInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { html: this.getHTML(props.value) };
    this.ref = React.createRef();
  }
  getHTML = (value) => {
    const word = this.props.word || '';
    const rg = new RegExp(word, 'gi');
    const spanClassName = this.props.hightlightClassName || 'sam-react-highlight-span';
    const htmlContent = (value || this.ref.current.textContent).replace(rg, `<span class="i${spanClassName}">${word}</span>`);

    return htmlContent;
  };

  handleChange = (value) => {
    this.setState({ html: this.getHTML(value) }, () => {
      if (this.props.onChange) this.props.onChange(this.ref.current.textContent);
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value || prevProps.word !== this.props.word) this.handleChange(this.props.value);
  }

  render = () => (
    <ContentEditable
      className={cx('sam-react-highlight-inputbox', this.props.className)}
      innerRef={this.ref}
      html={this.state.html} // innerHTML of the editable div
      disabled={false} // use true to disable edition
      onChange={this.handleChange.bind(this, null)} // handle innerHTML change
    />
  );
}
