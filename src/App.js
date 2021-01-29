import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Index from './components/index.component';
import Header from './components/header';
import Footer from './components/footer';
import UmfrageErstellen from './components/umfrage-erstellen.component';
import UmfragenAnzeigen from './components/umfragen-anzeigen.component';
import DatenEingeben from './components/daten-eingeben.component';

const App = () => {
    return (
      <Router>
      <Header />
      <div className="w3-container">
        <nav>
          <Link to={'/'} className="w3-bar-item w3-button">Home</Link>
          <Link to={'/umfrage-erstellen'} className="w3-bar-item w3-button">erstellen</Link>
          <Link to={'/umfrage/list'} className="w3-bar-item w3-button">anzeigen</Link>
        </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route path='/umfrage-erstellen' component={ UmfrageErstellen } />
          <Route path='/umfrage/list/:id' component={ DatenEingeben } />
          <Route path='/umfrage/list' component={ UmfragenAnzeigen } />
      </Switch>
      </div>
    <Footer />
    </Router>
    );
  }

export default App;