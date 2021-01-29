import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeSchuelerName = this.onChangeSchuelerName.bind(this);
    this.onChangeSchuelerNachname = this.onChangeSchuelerNachname.bind(this);
    this.onChangeSchuelerKlasse = this.onChangeSchuelerKlasse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      nachname: '',
      klasse:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/schueler/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                name: response.data.name, 
                nachname: response.data.nachname,
                klasse: response.data.klasse });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeSchuelerName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeSchuelerNachname(e) {
    this.setState({
      nachname: e.target.value
    })  
  }
  onChangeSchuelerKlasse(e) {
    this.setState({
      klasse: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      nachname: this.state.nachname,
      klasse: this.state.klasse
    };
    axios.post('http://localhost:4000/schueler/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/list');
    window.location.reload();
  }
 
  render() {
    return (
        <div className="w3-container w3-card-2">
            <h3>Schüler*in bearbeiten</h3>
            <form onSubmit={this.onSubmit} className="w3-container">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="w3-input" 
                      value={this.state.name}
                      onChange={this.onChangeSchuelerName}
                      />
                    <label>Nachname: </label>
                    <input type="text" 
                      className="w3-input"
                      value={this.state.nachname}
                      onChange={this.onChangeSchuelerNachname}
                      />
                    <label>Klasse: </label>
                    <input type="text" 
                      className="w3-input"
                      value={this.state.klasse}
                      onChange={this.onChangeSchuelerKlasse}
                      />
                    <input type="submit" 
                      value="Schüler*in bearbeiten" 
                      className="w3-button w3-blue w3-round-large w3-hover-white w3-ripple w3-margin-top w3-margin-bottom"/>
            </form>
        </div>
    )
  }
}