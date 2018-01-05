/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './redux/store';
import moment from 'moment';
import Root from './app/containers/Root';

require('./favicon.ico');
import './styles/base.scss';
import 'moment/locale/pt-br';
 
moment.locale('pt-br');

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./app/containers/Root', () => {
    const NewRoot = require('./app/containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}