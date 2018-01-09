import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
  
import TypographyError from '../../../common/material/TypographyError'; 
import TextFieldError from '../../../common/material/TextFieldError';

class AccountForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired
    };

    state = {
        name: ""
    }
    
    handleSubmit = () => this.props.onSubmit(null, this.state);

    render() {
        const { errors, onClose } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            disabled = false;
        }

        return (
            <div>
                <DialogContent>

                    <TypographyError>
                        {errors.detail}
                    </TypographyError>

                    <TextFieldError
                        label="Nome" 
                        error={errors.name}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button raised color="primary" disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default AccountForm;