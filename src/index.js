import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { payload } from './Payload'   // XXX 仮実装
import './index.css'

fetch('http://localhost/sem', {
  method: 'post',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
  credentials: 'cors',
  chache: 'force cache'
}).then(function(response) {
  return response.json()
}).then(function(json) {
  ReactDOM.render(
    <App json={json} />,
    document.getElementById('root')
  )
}.bind(this))
