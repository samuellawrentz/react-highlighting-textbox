import React from 'react';
import ContentEditable from 'react-contenteditable';
import './styles.scss';

/**
 * A React component that renders a ContentEditable div with the ability to highlight specific words or phrases.
 */
class HighlightInputBox extends React.Component {
  /**
   * Initializes the state of the component and creates a ref for the ContentEditable div.
   * @param {Object} props - The component props.
   * @param {string} props.value - The value of the input box.
   * @param {string | string[]} props.word - The word(s) to highlight.
   * @param {string} props.highlightClassName - The class name to apply to the span element that highlights the word(s).
   * @param {Function} props.onChange - The callback function to trigger when the value of the input box changes.
   * @param {Function} props.onBlur - The callback function to trigger when the user clicks outside of the input box.
   * @param {Function} props.onKeyUp - The callback function to trigger when the user releases a key.
   * @param {Function} props.onClick - The callback function to trigger when the user clicks on the input box.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = { html: this.getHTML(props.value) };
    this.ref = React.createRef();
  }

  /**
   * Replaces a specified word in a string with an HTML span element that has a specified class and an onClick event that selects the span element.
   * @param {string} word - The word to highlight.
   * @param {string} textContent - The text content to search for the word.
   * @returns {string} - The modified text content with the word highlighted.
   */
  replacer = (word, textContent) => {
    // Don't highlight the word if it is too long
    if (word.length > 40) return textContent;
    const rg = new RegExp(`${word}`, 'gi');
    const spanClassName = this.props.highlightClassName || 'sam-react-highlight-span';

    return textContent.replace(
      rg,
      `<span onClick="var r=document.createRange();r.selectNode(this);window.getSelection().removeAllRanges();window.getSelection().addRange(r)" class="${spanClassName}">${word}</span>`,
    );
  };

  /**
   * Returns the HTML content with the specified word(s) highlighted.
   * @param {string} value - The value of the input box.
   * @returns {string} - The HTML content with the specified word(s) highlighted.
   */
  getHTML = (value) => {
    if (!value) return value;
    const { word } = this.props;
    const textContent = value || (this.ref && this.ref.current ? this.ref.current.textContent : '');
    if (!word) return textContent;
    let htmlContent = textContent;
    if (typeof word === 'string') htmlContent = this.replacer(word, htmlContent);
    else if (Array.isArray(word))
      word.forEach((w) => {
        htmlContent = this.replacer(w, htmlContent);
      });

    return htmlContent;
  };

  /**
   * Updates the state of the component with the highlighted HTML content and triggers a callback function when the user clicks outside of the div.
   * @param {Event} evt - The event object.
   * @param {string} value - The value of the input box.
   * @returns {void}
   */
  handleChange = (evt) => {
    evt.persist?.();
    const value = this.props.triggerOn === 'change' ? evt.target.value : this.ref.current.textContent;
    this.setState({ html: this.getHTML(value) }, () => {
      const e = Object.assign({}, evt, { target: { value } });
      if (this.props.onChange && this.ref && this.ref.current) this.props.onChange(e);
    });
  };

  /**
   * Updates the state of the component when the props change.
   * @param {Object} prevProps - The previous props.
   * @param {Object} prevState - The previous state.
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value || prevProps.word !== this.props.word) {
      this.setState({ html: this.getHTML(this.props.value) });
    }
  }

  /**
   * Renders the HighlightInputBox component.
   * @returns {JSX.Element} - The rendered component.
   */
  render() {
    return (
      <ContentEditable
        className="sam-react-highlight-inputbox"
        innerRef={this.ref}
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.props.triggerOn === 'change' ? this.handleChange : undefined} // handle innerHTML change
        onBlur={this.props.triggerOn === 'blur' ? this.handleChange : undefined} // handle innerHTML change
        onKeyUp={this.props.onKeyUp}
        onClick={this.props.onClick}
      />
    );
  }
}

export default React.memo(React.forwardRef((props, ref) => <HighlightInputBox innerRef={ref} {...props} />));
