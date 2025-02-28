import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
export default class Popup extends React.Component  {
    render() {
        return (
            <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
        );
    }


}
class App extends React.Component {
    constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render() {
      return (
        <div className='app'>
          <h1>hihi</h1>
          <button onClick={this.togglePopup.bind(this)}>show popup</button>
          <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
          <p>Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br /></p>
          {this.state.showPopup ? 
            <Popup
              text='Close Me'
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
        </div>
      );
    }
  };

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
