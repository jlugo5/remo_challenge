import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Auth from './components/Auth';
import Theater from './components/Theater';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

import {setCurrentUser} from './reducers/user.action'

const store = createStore(reducers, {});
const persistor = persistStore(store)


const App = () => {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Auth} />
            <Route exact={true} path='/theater' component={Theater} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

const mapStateToProps = ({user}) => (
  {
    currentUser: user.currentUser
  }
)

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
