import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HabitComponent from './components/HabitComponent';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Habit Tracker</h1>
        <Switch>
          <Route path="/" exact component={HabitComponent} />
          {/* Puedes agregar más rutas aquí */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;