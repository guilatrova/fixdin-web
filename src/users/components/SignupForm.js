import React from 'react';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import TextFieldError from '../../common/material/TextFieldError';

class SignupForm extends React.Component {

    static propTypes = {
        isFetching: PropTypes.func.isFetching,
        onSubmit: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired
    }

    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state).then((action) => {
            if (action.result === 'success') {
                this.setState({ redirect: true});
            }
        });
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

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

        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }

        return (
            <form onSubmit={this.handleSubmit}>

                <TextField
                    name="username"
                    label="Usuário"
                    onChange={this.handleChange}
                    value={this.state.username}
                    error={errors.username} />

                <TextField
                    name="first_name"
                    label="Primeiro nome"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                    error={errors.first_name} />

                <TextField
                    name="last_name"
                    label="Último nome"
                    onChange={this.handleChange}
                    value={this.state.last_name} 
                    error={errors.last_name} />

                <TextFieldError
                    name="email"
                    label="E-mail"
                    onChange={this.handleChange}
                    value={this.state.email}
                    error={errors.email} />

                <TextField                    
                    name="password"
                    label="Senha"                    
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    error={errors.password} />

                <div>
                    <Button variant="raised" color="primary" onClick={this.handleSubmit} disabled={this.isSubmitDisabled()}>
                        Criar conta
                    </Button>
                    <Link to="/login">Entrar</Link>
                </div>

            </form>
        );
    }
}

export default SignupForm;