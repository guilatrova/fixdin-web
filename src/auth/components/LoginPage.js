import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchToken } from '../actions';

import LoginForm from './LoginForm';

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

class LoginPage extends React.Component {

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
                                            <h3 style={{margin: 0, padding: 25}}>Sign in to Rubix</h3>
                                            </div>
                                            <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                                            <div>You need to sign in for those awesome features</div>
                                            <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                                                <Button id='facebook-btn' lg bsStyle='darkblue' type='submit' >
                                                <Icon glyph='icon-fontello-facebook' />
                                                <span>Sign in <span className='hidden-xs'>with facebook</span></span>
                                                </Button>
                                            </div>
                                            <div>
                                                <a id='twitter-link' href='#'><Icon glyph='icon-fontello-twitter' /><span> or with twitter</span></a>
                                            </div>
                                            </div>
                                            <div>
                                            <div className='text-center' style={{padding: 12.5}}>
                                                or use your Rubix account
                                            </div>
                                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                                <LoginForm {...this.props} />
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
        )
    }
}

LoginPage.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
}

LoginPage.defaultProps = {
    error: ''
}

const mapStateToProps = (state) => {
    return {
        ...state.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (loginData) => {
            return dispatch(fetchToken(loginData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);