import React, { Component } from 'react';
import './App.css';
import "./nprogress.css"
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from "./api";



class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      const { numberOfEvents } = this.state;
      if (this.mounted) {
        const filteredEvents = events.slice(0, numberOfEvents);
        this.setState({ 
          events: filteredEvents,
          locations: extractLocations(events),
        });
      }

      if (!navigator.onLine) {
        this.setState({
          infoText: 'You are currently offline.  The list of events may not be up-to-date.'
        });
      }
    });
  }
  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
          ? events
          : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === 'all'
          ? events
          : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };



  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
