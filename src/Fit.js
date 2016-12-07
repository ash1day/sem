import React, {Component} from 'react'

const fitsKeyNames = [ 'gfi', 'agfi', 'rmr', 'cfi', 'aic', 'rmsea' ]

class Fit extends Component {
  render() {
    const fits = this.props.json.goodness_of_fit
    let rows = []

    if (!fits) return <div className="Fit" />

    for (const k of Object.keys(fits).sort()) {
      if (fitsKeyNames.includes(k))
      rows.push(
        <tr key={k} >
          <th>{k.toUpperCase()}</th>
          <td>{fits[k].split('.')[0]}</td>
          <td>.{fits[k].split('.')[1]}</td>
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
