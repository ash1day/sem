import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Graph json={this.props.json} />
        <Fit json={this.props.json} />
      </div>
    )
  }
}

export default App
