import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      showList: false
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.showList) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      console.log("Removing Autocomplete listener on update!");
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  componentWillUnmount () {
    console.log("Cleaning up event listener from Autocomplete!");
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleInput = (e) => {
    this.setState({ inputVal: e.target.value });
  }

  selectName = ({ target:  { innerText: name }}) => {
    this.setState({ inputVal: name, showList: false });
  }

  // Set focus to input field if user clicks anywhere inside the Autocomplete
  // section (unless they have selected a name from the dropdown list)
  handleAutocompleteSectionClick = ({ target }) => {
    if (!target.classList.contains("nameLi")) {
      this.inputRef.current.focus();
    }
  }

  handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === this.inputRef.current) return;
    else this.setState({ showList: false });
  }

  matches = () => {
    const { inputVal } = this.state;
    const { names } = this.props;
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }

  render() {
    const results = this.matches().map((result) => {
      const nodeRef = React.createRef();
      return (
        <CSSTransition
          nodeRef={nodeRef}
          key={result}
          classNames="result"
          timeout={{ enter: 500, exit: 300 }}
        >
          <li ref={nodeRef} className="nameLi" onClick={this.selectName}>
            {result}
          </li>
        </CSSTransition>
      )
    });

    return (
      <section 
        className="autocomplete-section" 
        onClick={this.handleAutocompleteSectionClick}
      >
        <h1>Autocomplete</h1>
        <div className="auto">
          <input
            placeholder="Search..."
            ref={this.inputRef}
            onChange={this.handleInput}
            value={this.state.inputVal}
            onFocus={() => this.setState({ showList: true })}
          />
          {this.state.showList && (
            <ul className="auto-dropdown">
              <TransitionGroup>
                {results}
              </TransitionGroup>
            </ul>
          )}
        </div>
      </section>
    );
  }
}

export default AutoComplete;