import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Index from './components/index.component';
import Footer from './components/footer.component';
import Umfragen from './components/umfragen.component';
import UmfragenVorstellen from './components/umfragen-vorstellen.component';
import UmfrageAnzeigen from './components/umfrage-anzeigen.component';

const App = () => {
    return (
      <Router>
      <div className="container">
        <nav>
          <Link to={'/'} className="navButton">Home</Link>
          <Link to={'/umfragen'} className="navButton" >Umfrage</Link>
          <Link to={'/umfrage/list'} className="navButton">anzeigen</Link>
        </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/umfragen' component={ Umfragen } />
          <Route exact path='/umfrage/list/:id' component={ UmfrageAnzeigen } />
          <Route exact path='/umfrage/list' component={ UmfragenVorstellen } />
      </Switch>
      </div>
    <Footer />
    </Router>
    );
  }

export default App;