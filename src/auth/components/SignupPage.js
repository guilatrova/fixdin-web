import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import { fetchSignup } from '../actions';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  LoremIpsum,
  InputGroup,
  FormControl,
  ButtonGroup,
  ButtonToolbar,
  PanelContainer,
} from '@sketchpixy/rubix';

class SignupPage extends React.Component {

    componentDidMount() {
        var html = document.getElementsByTagName('html')[0];
        html.classList.add('authentication');
    }

    componentWillUnmount() {
        var html = document.getElementsByTagName('html')[0];        
        html.classList.remove('authentication');
    }

    render() {    
      return (
        <div id='auth-container' className='login'>
          <div id='auth-row'>
            <div id='auth-cell'>
              <Grid>
                <Row>
                  <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                    <PanelContainer controls={false}>
                      <Panel>
                        <PanelBody style={{padding: 0}}>
                          <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 25}}>Sign up</h3>
                          </div>

                          <div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                              <SignupForm onSubmit={this.props.onSubmit} />
                            </div>

                            <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                              <div style={{marginBottom: 12.5}}>SIGN UP WITH</div>
                              <Grid>
                                <Row>
                                  <Col xs={12} sm={6} smCollapseRight>
                                    <Button block type='submit' id='facebook-btn' lg bsStyle='darkblue'>
                                      <Icon glyph='icon-fontello-facebook' />
                                      <span>Facebook</span>
                                    </Button>
                                    <br className='visible-xs' />
                                  </Col>
                                  <Col xs={12} sm={6}>
                                    <Button block type='submit' id='twitter-btn' lg bsStyle='darkblue'>
                                      <Icon glyph='icon-fontello-twitter' />
                                      <span>Twitter</span>
                                    </Button>
                                  </Col>

                                </Row>
                              </Grid>
                              <div style={{marginTop: 25}}>
                                Already have an account? <Link to='/login'>Login</Link>
                              </div>
                            </div>
                          </div>
                        </PanelBody>
                      </Panel>
                    </PanelContainer>
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      );
    }
}

SignupPage.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.auth.signup
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (signupData) => {
      dispatch(fetchSignup(signupData))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);