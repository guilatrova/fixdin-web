import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles'

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import store from './store';
import Footer from './common/components/Footer';
import Header from './common/components/Header';
import Sidebar from './common/components/Sidebar';

export class App extends React.Component {
    render() {
        return (          
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

export class DashboardContainer extends React.Component {
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