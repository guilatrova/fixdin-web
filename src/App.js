/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AppBodyContainer from './app/containers/AppBodyContainer';
import HomePage from './home/HomePage';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBodyContainer>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/test" component={() => "TESTE"} />
          {/* <Route path="/fuel-savings" component={FuelSavingsPage} />           */}
          {<Route component={() => "not found"} />}
        </Switch>
        </AppBodyContainer>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;