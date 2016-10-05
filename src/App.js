import React, { Component } from 'react'
import Graph from './Graph'
import { payload } from './Payload'   // XXX 仮実装
import { payload2 } from './Payload2' // XXX
import './App.css'

const payloads = [payload, payload2]

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

  handleClick = (e) => {
    this.setState({ payload: payloads[e.target.value] })
    this.fetchJson ()
  }

  render() {
    return (
      <div className="App">
        <input type="button" onClick={this.handleClick} value="0" />
        <input type="button" onClick={this.handleClick} value="1" />
        <Graph json={this.state.json} />
      </div>
    )
  }
}

export default App
