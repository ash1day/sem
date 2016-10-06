import React, {Component} from 'react'
import './Fit.css'

class Fit extends Component {
  componentDidMount() {
    this.fits = this.props.json.goodness_of_fit
  }

  componentWillUpdate = (nextProps) => {
    this.fits = nextProps.json.goodness_of_fit
  }

  render() {
    let rows = []

    if (!this.fits) return <div className="Fit" />

    for (const k of Object.keys(this.fits).sort()) {
      rows.push(
        <tr key={k} >
          <th>{k}</th>
          <td>{this.fits[k].split('.')[0]}</td>
          <td>.{this.fits[k].split('.')[1]}</td>
        </tr>
      )
    }

    return <div className="Fit">
             <table>
               <tbody>{rows}</tbody>
             </table>
           </div>
  }
}

export default Fit
