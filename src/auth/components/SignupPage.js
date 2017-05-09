import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { sendSignupRequest } from '../authActions';

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

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var html = document.getElementsByTagName('html')[0];
        html.classList.add('authentication');
    }

    componentWillUnmount() {
        var html = document.getElementsByTagName('html')[0];        
        html.classList.remove('authentication');
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendSignupRequest(this.state).then(
            ({data}) => {
                console.log(data);
            },
            (data) => {
                console.error(data);
            }
        );
    }

  handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
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
                            <Form onSubmit={this.handleSubmit}>

                              <FormGroup controlId='username'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroup.Addon>
                                  <FormControl autoFocus 
                                    type='text' 
                                    className='border-focus-blue' 
                                    placeholder='Username'
                                    name="username"
                                    onChange={this.handleChange}
                                    value={this.state.username} />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup controlId='first_name'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroup.Addon>
                                  <FormControl 
                                    type='text' 
                                    className='border-focus-blue' 
                                    placeholder='First name'
                                    name="first_name"
                                    onChange={this.handleChange}
                                    value={this.state.first_name} />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup controlId='last_name'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroup.Addon>
                                  <FormControl 
                                    type='text' 
                                    className='border-focus-blue' 
                                    placeholder='Last name'
                                    name="last_name"
                                    onChange={this.handleChange}
                                    value={this.state.last_name} />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroup.Addon>
                                  <FormControl 
                                    type='email' 
                                    className='border-focus-blue' 
                                    placeholder='support@sketchpixy.com'
                                    name='email'
                                    onChange={this.handleChange}
                                    value={this.state.email} />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup controlId='password'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroup.Addon>
                                  <FormControl 
                                    type='password' 
                                    className='border-focus-blue' 
                                    placeholder='password'
                                    name='password'
                                    onChange={this.handleChange}
                                    value={this.state.password}  />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='submit' outlined lg bsStyle='blue' block >Create account</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>

                            </Form>
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

Signup.propTypes = {
    sendSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { sendSignupRequest})(Signup);