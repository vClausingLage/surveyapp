import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Edit from './components/schueler-berabeiten';
import List from './components/schueler-auflisten';
import Header from './components/header';
import Footer from './components/footer';
import NotenEintragen from './components/noten-eintragen.component';
import Index from './components/index.component';
import SchuelerErstellen from './components/schueler-erstellen.component';
import KlassenListe from './components/klassen-auflisten.component';

class App extends Component {
  render() {
    return (
      <Router>
      <Header />
      <div className="w3-container">
          <nav>
              <Link to={'/'} className="w3-bar-item w3-button">Home</Link>
              <Link to={'/list'} className="w3-bar-item w3-button">Schüler anzeigen</Link>
              <Link to={'/create'} className="w3-bar-item w3-button">Schüler erstellen</Link>
              <Link to={'/klassen/list'} className="w3-bar-item w3-button">Klassen anzeigen</Link>
          </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/list' component={ List } />
          <Route exact path='/create' component={ SchuelerErstellen } />
          <Route path='/edit/:id' component={ Edit } />
          <Route path='/noten-eintragen/:id' component={ NotenEintragen } />
          <Route path='/klassen/list' component={ KlassenListe } />
      </Switch>
      </div>
    <Footer />
    </Router>
    );
  }
}

export default App;