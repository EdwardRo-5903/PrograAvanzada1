import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importa el Provider
import store from './store/store'; // Importa el store
import HabitComponent from './components/HabitComponent';
import './styles/App.css';

const App = () => {
  return (
    <Provider store={store}> {/* Conecta Redux */}
      <Router>
        <div className="App">
          <h1>Habit Tracker</h1>
          <Switch>
            <Route path="/" exact component={HabitComponent} />
            {/* Puedes agregar más rutas aquí */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;