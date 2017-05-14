import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

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

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendSignupRequest(this.state).then(
            ({data}) => {
                console.log(data);
            },
            (data) => {
                this.setState({ errors: data });
            }
        );
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
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
        );
    }
}

SignupForm.propTypes = {
    sendSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;