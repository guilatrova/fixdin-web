import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TypographyError from '../../../common/material/TypographyError';
import TextFieldError from '../../../common/material/TextFieldError';

class AccountForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        account: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { account } = this.props;

        this.state = {
            id: account.id || null,
            name: account.name || ""
        };
    }
    
    handleSubmit = () => this.props.onSubmit(this.state.id, { name: this.state.name });

    render() {
        const { errors, onClose, account } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            if (this.state.name != account.name) { //If same name doesn't try to save
                disabled = false;
            }
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

                    <Button variant="raised" color="primary" disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default AccountForm;