import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import CurrencyTextField from '../../../common/material/CurrencyTextField';
import TypographyError from '../../../common/material/TypographyError';
import AccountAutocomplete from '../../accounts/components/AccountAutocomplete';

class TransferForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
        fromAccount: PropTypes.object,
    };

    state = {
        value: 0
    }
    
    handleSubmit = () => {
        const { fromAccount } = this.props;
        const { toAccount, value } = this.state;
        this.props.onSubmit(value, fromAccount.id, toAccount.id);
    };

    render() {
        const { errors, onClose, fromAccount, classes } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.toAccount && this.state.value) {
            disabled = false;
        }

        return (
            <div>
                <DialogContent className={classes.content}>

                    <TypographyError>
                        {errors.detail}
                    </TypographyError>

                    <TextField
                        label="De"
                        value={fromAccount.name}
                        readOnly
                    />

                    <AccountAutocomplete
                        label="Para"
                        value={this.state.toAccount}
                        maxSuggestionsDisplay={3}
                        error={errors.toAccount}
                        onChange={(toAccount) => this.setState({ toAccount })}
                    />

                    <CurrencyTextField
                        id="value"
                        label="Valor"
                        error={errors.value}
                        value={this.state.value}
                        onChangeEvent={(e, maskedValue, value) => this.setState({ value })}
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

export default TransferForm;