import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Button,
  Alert,
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
        this.props.onSubmit(this.state).then((action) => {
            if (action.result === 'success') {
                browserHistory.push('/');
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
        const { isFetching, error } = this.props;
        let submitDisabled = true;
        if (this.state.email && this.state.password && !isFetching) {
            submitDisabled = false;
        }

        return (
        <Form onSubmit={this.handleSubmit}>
            
            {error && 
            <Alert danger>
                <strong>Opa!</strong> <span>{error}</span>
            </Alert>
            }

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
                    <Button outlined lg type='submit' bsStyle='blue' disabled={submitDisabled}>Login</Button>
                    </Col>
                </Row>
                </Grid>
            </FormGroup>

            </Form>
        );
    }
}

LoginForm.prototypes = {
    onSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
}

export default LoginForm;