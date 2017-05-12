import React from 'react';
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
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendLoginRequest(this.state).then(
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
        <Form onSubmit={this.handleSubmit}>

            <FormGroup controlId='emailaddress'>
                <InputGroup bsSize='large'>
                <InputGroup.Addon>
                    <Icon glyph='icon-fontello-mail' />
                </InputGroup.Addon>
                <FormControl 
                    autoFocus
                    className='border-focus-blue'  
                    type='email'                                                     
                    placeholder='email@fixdin.com'
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
                    className='border-focus-blue' 
                    type='password' 
                    placeholder='password' 
                    name='password' 
                    onChange={this.handleChange}
                    value={this.state.password} />
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <Grid>
                <Row>
                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                    <Link to='/signup'>Create a Rubix account</Link>
                    </Col>
                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                    <Button outlined lg type='submit' bsStyle='blue'>Login</Button>
                    </Col>
                </Row>
                </Grid>
            </FormGroup>

            </Form>
        );
    }
}

LoginForm.prototypes = {
    sendLoginRequest: React.PropTypes.func.isRequired
}

export default LoginForm;