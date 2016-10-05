import React, {Component} from 'react'
import cytoscape from 'cytoscape'
import { conf, layout } from './conf'
import { payload } from './Payload' // XXX
import './Graph.css'

class Graph extends Component{
  componentDidMount() {
    conf.container = this.refs.cyelement
    this.cy = cytoscape(conf)
    this.updateJson(this.props.json)
  }

  componentWillUpdate(nextProps, nextState) {
    this.updateJson(nextProps.json)
  }

  updateJson(json) {
    if (!Object.keys(json).length) return
    this.cy.json(this.build_graph(json))
    this.cy.layout(layout)
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  build_graph(json) {
    let nodes = [], edges = []
    let p, group
    for (let name of json.names) {
      group = (payload.obs_names.includes(name)) ? 0 : 1
      nodes.push({ data: { id: name, name: name, group: group, value: 0 } })
    }

    // 潜在変数の定義式より、ノードとリンクを作成
    for (const left_var in json.latent_variables) {
      if(json.latent_variables.hasOwnProperty(left_var)) {
        for (const right_var of json.latent_variables[left_var]) {
          p = (right_var['P(>|z|)']) ? right_var['P(>|z|)'] : 0
          edges.push({ data: { id: [left_var, right_var.name].join('_'), source: left_var, target: right_var.name, value: parseFloat(right_var['Estimate']), p: p } })
        }
      }
    }

    // 回帰の式からリンクを作成
    for (const left_var in json.regressions) {
      if(json.regressions.hasOwnProperty(left_var)) {
        for (const right_var of json.regressions[left_var]) {
          p = (right_var['P(>|z|)']) ? right_var['P(>|z|)'] : 0
          edges.push({ data: { id: [right_var.name, left_var].join('_'), source: right_var.name, target: left_var, value: parseFloat(right_var['Estimate']), p: p } })
        }
      }
    }

    for (const edge of edges) {
      for (const node of nodes) {
        if (node.data.id === edge.data.source) {
          node.data.value += edge.data.value
        }
      }
    }

    return { elements: { nodes: nodes, edges: edges } }
  }

  render() {
    return <div className="Graph" ref="cyelement" />
  }
}

export default Graph
