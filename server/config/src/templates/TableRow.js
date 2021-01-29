import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/schueler/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr className="w3-hover-light-grey">
          <td>
            {this.props.obj.schueler_name}
          </td>
          <td>
            {this.props.obj.schueler_nachname}
          </td>
          <td>
            {this.props.obj.schueler_klasse}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="w3-button w3-teal w3-round-large w3-hover-white w3-ripple w3-margin-right">Edit</Link>
            <button onClick={this.delete} className="w3-button w3-indigo w3-round-large w3-hover-deep-orange w3-ripple">Delete</button>          
          </td>
        </tr>
    );
  }
}

export default TableRow;