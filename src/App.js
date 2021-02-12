import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Index from './components/index.component';
import Footer from './components/footer.component';
import UmfrageErstellen from './components/umfrage-erstellen.component';
import UmfragenList from './components/umfragen-list.component';
import UmfrageAnzeigen from './components/umfrage-anzeigen.component';
import FireUmfrage from './components/fire-umfrage.component';
import Ergebnisse from './components/ergebnisse.component';
import Test from './components/test.component';

const App = () => {
    return (
      <Router>
      <div className="container">
        <nav>
          <Link to={'/'} className="navButton">Home</Link>
          <Link to={'/umfrage/erstellen'} className="navButton" >neue Umfrage erstellen</Link>
          <Link to={'/umfragen/list'} className="navButton">Ihre Umfragen</Link>
        </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/umfrage/erstellen' component={ UmfrageErstellen } />
          <Route exact path='/umfrage/list/:id' component={ UmfrageAnzeigen } />
          <Route exact path='/umfragen/list' component={ UmfragenList } />
          <Route path='/umfragen/fire/:id' component={ FireUmfrage } />
          <Route path='/ergebnisse/:id' component={ Ergebnisse } />
          <Route path='/test' component={ Test } />
      </Switch>
      </div>
    <Footer />
    </Router>
    );
  }

export default App;