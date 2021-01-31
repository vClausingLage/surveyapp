import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Index from './components/index.component';
import Footer from './components/footer.component';
import Umfragen from './components/umfragen.component';
import UmfrageErstellen from './components/umfrage-erstellen.component';
import UmfragenAnzeigen from './components/umfragen-anzeigen.component';
import DatenEingeben from './components/daten-eingeben.component';

const App = () => {
    return (
      <Router>
      <div className="container">
        <nav>
          <Link to={'/'} className="button">Home</Link>
          <Link to={'/umfragen'} className="button" >Umfrage</Link>
          <Link to={'/umfrage-erstellen'} className="button">erstellen</Link>
          <Link to={'/umfrage/list'} className="button">anzeigen</Link>
        </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/umfragen' component={ Umfragen } />
          <Route exact path='/umfrage-erstellen' component={ UmfrageErstellen } />
          <Route exact path='/umfrage/list/:id' component={ DatenEingeben } />
          <Route exact path='/umfrage/list' component={ UmfragenAnzeigen } />
      </Switch>
      </div>
    <Footer />
    </Router>
    );
  }

export default App;