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
  HelpBlock,
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
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    isSubmitDisabled() {
        if (this.props.isFetching) {
            return true;
        }

        if (this.state.username && this.state.email && this.state.first_name && this.state.last_name && this.state.password)
            return false;
            
        return true;
    }

    render() {
        const { errors } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormGroup controlId='usernameGroup' validationState={'username' in errors ? 'error' : undefined}>
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

                    {errors.username &&
                        <HelpBlock>{errors.username}</HelpBlock>
                    }

                </FormGroup>

                <FormGroup controlId='firstNameGroup' validationState={'first_name' in errors ? 'error' : undefined}>
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

                    {errors.first_name &&
                        <HelpBlock>{errors.first_name}</HelpBlock>
                    }

                </FormGroup>

                <FormGroup controlId='lastNameGroup' validationState={'last_name' in errors ? 'error' : undefined}>
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

                {errors.last_name &&
                    <HelpBlock>{errors.last_name}</HelpBlock>
                }
                </FormGroup>

                <FormGroup controlId='emailAddressGroup' validationState={'email' in errors ? 'error' : undefined}>
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

                {errors.email &&
                    <HelpBlock>{errors.email}</HelpBlock>
                }
                </FormGroup>

                <FormGroup controlId='passwordGroup' validationState={'password' in errors ? 'error' : undefined}>
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

                {errors.password &&
                    <HelpBlock>{errors.password}</HelpBlock>
                }
                </FormGroup>

                <FormGroup>
                <Grid>
                    <Row>
                    <Col xs={12} collapseLeft collapseRight>
                        <Button type='submit' bsStyle='blue' disabled={this.isSubmitDisabled()} outlined lg block >Create account</Button>
                    </Col>
                    </Row>
                </Grid>
                </FormGroup>

            </Form>
        );
    }
}

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SignupForm;