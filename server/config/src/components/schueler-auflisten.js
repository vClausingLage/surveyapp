import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SchuelerAuflisten extends Component {
  state = {
    schueler: []
  }

  componentDidMount() {
    axios.get('http://localhost:4000/schueler')
      .then(res => {
        const schueler = res.data;
        this.setState({ schueler });
      })
  }

  deleteSchueler = (id) => {
    axios.get('http://localhost:4000/schueler/delete/' + id)
      .catch(err => console.log(err));
      window.location.reload();
  }
  
  render() {
    return (
      <Fragment>
        <div className="w3-panel w3-blue">
          Klasse
        </div>
        <div className="w3-panel w3-blue">
          Suchleiste 
        </div>
        <div className="w3-panel w3-blue">
          Filter / Sortieren
        </div>

        <div className="w3-container">
        <table className="w3-table-all">
        <thead>
        <tr>
            <th>Name</th><th>Nachname</th><th>Klasse</th>
        </tr>
        </thead>
        <tbody>
        {this.state.schueler.map(schueler => (
          <Fragment key={schueler._id}>
            <tr>
            <td>{schueler.name}</td>
            <td>{schueler.nachname}</td>
            <td>{schueler.klasse}</td>
            <td><Link to={'/noten-eintragen/'+schueler._id} className="w3-button w3-white w3-border w3-border-blue w3-round-large">Noten eintragen</Link></td>
            <td><Link to={'/edit/'+schueler._id} className="w3-button w3-blue w3-round-large w3-margin-right"><i className="material-icons" style={{fontSize: "0.95rem"}}>edit</i></Link><button onClick={event => this.deleteSchueler(schueler._id)} className="w3-button w3-white w3-border w3-border-red w3-round-large"><i className="material-icons w3-text-red" style={{fontSize: "0.95rem"}}>delete</i></button></td>
            </tr>
          </Fragment>
        ))}
        </tbody>
        </table>
        </div>
      </Fragment>
    )
  }
}

export default SchuelerAuflisten;
