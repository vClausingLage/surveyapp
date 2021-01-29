import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './css/component.css';
import './css/component.main.css';

import Index from './components/index.component';
import Header from './components/header.component';
import Footer from './components/footer.component';
import ToDo from './components/todolist.component';
import TestJS from './components/testJS.component';

function App() {
  return (
    <div>
    <Router>
      <Header />
      <div className="w3-container">
        <nav>
          <Link to={'/'} className="uw3-button">Home</Link>
          <Link to={'/todolist'} className="w3-button">To Do Liste</Link>
          <Link to={'/jstest'} className="w3-button">JS Testing</Link>
        </nav>
      <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/todolist' component={ ToDo } />
          <Route exact path='/jstest' component={ TestJS } />
      </Switch>
      </div>
    <Footer />
    </Router>
    </div>
  );
}

export default App;
