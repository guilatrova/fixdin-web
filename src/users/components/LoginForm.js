import React from 'react';
import PropTypes from 'prop-types';

import { Link, Redirect, browserHistory } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';

import TextFieldError from '../../common/material/TextFieldError';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

class LoginForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired
    }

    state = {
        email: '',
        password: ''
    }    

    handleSubmit = () => {
        this.props.onSubmit(this.state).then((action) => {
            if (action.result === 'success') {
                browserHistory.push('/');
            }
        });
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    
    render() {
        const { isFetching, error, classes } = this.props;
        let submitDisabled = true;
        if (this.state.email && this.state.password && !isFetching) {
            submitDisabled = false;
        }

        return (
            <form noValidate autoComplete="off">
                
                {error && <FormControl className={classes.formControl} error>
                    <FormHelperText>{error}</FormHelperText>
                </FormControl>}

                <TextFieldError
                    name="email"
                    label="E-mail"
                    onChange={this.handleChange}
                    value={this.state.email}
                />

                <TextField                    
                    name="password"
                    label="Senha"                    
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                />

                <div>
                    <Button raised color="primary" onClick={this.handleSubmit} disabled={submitDisabled}>Login</Button>
                    <Link to="/signup">Criar conta</Link>
                </div>

            </form>
        );
    }
}

export default withStyles(styles)(LoginForm);