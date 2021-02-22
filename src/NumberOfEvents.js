import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventCount: this.props.eventCount,
  };

  handleEventInputChanged = (event) => {
    const eventCount = event.target.value;
    if (eventCount < 1) {
      return this.setState({
        eventCount: '',
        errorText: `Select number between 1 and 32`,
      });
    } else if (eventCount > 32) {
      return this.setState({
        eventCount: '',
        errorText: `Select number between 1 and 32`,
      });
    } else {
      this.setState({
        eventCount,
        errorText: '',
      });
      this.props.updateEvents('', eventCount);
    }
  };

  render() {
    return (
      <div className='numberOfEvents'>
             <label className= "numberofeventslabel">Number of events:</label>
             <ErrorAlert text={this.state.infoText} />
        <input
          type='number'
          name='numberOfEvent'
          className='event-number-input'
          placeholder='Enter Number of Events'
          value={this.state.eventCount}
          onChange={this.handleEventInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;