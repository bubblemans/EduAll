import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmitMessage(this.state.message)
    this.setState({ message: ''})
  }

  handleChange(event) {
    this.setState({ message: event.target.value})
  }

  render() {
    return (
      <form action='.' onSubmit={this.handleSubmit}>
        <input type='text' placeholder={'Enter...'} value={this.state.message} onChange={this.handleChange}/>
        <input type='submit' value={'Send'}/>
      </form>
    );
  }
}

export default ChatInput;