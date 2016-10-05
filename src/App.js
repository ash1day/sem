import React, { Component } from 'react'
import Graph from './Graph'
import { payload } from './Payload' // XXX
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { payload: payload, json: {} }
  }

  componentDidMount() {
    this.fetchJson ()
  }

  fetchJson = () => {
    fetch('http://localhost:4567/sem', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state.payload),
      credentials: 'cors',
      chache: 'force cache'
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({ json: json })
    }.bind(this))
  }

  render() {
    return (
      <div className="App">
        <Graph json={this.state.json} />
      </div>
    )
  }
}

export default App
