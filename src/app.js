import React from 'react';
import { Provider } from 'react-redux';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import store from './store';
import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

export class Dashboard extends React.Component {
  render() {
    return (      
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}