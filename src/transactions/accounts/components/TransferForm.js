import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import PrimaryButton from '../../../common/components/PrimaryButton';
import CancelButton from '../../../common/components/CancelButton';
import CurrencyTextField from '../../../common/material/CurrencyTextField';
import TypographyError from '../../../common/material/TypographyError';
import AccountSelectPicker from '../../accounts/components/AccountSelectPicker';

const styles = {
    formRow: {
        marginBottom: 10
    },
    root: {
        paddingTop: 20,
        overflowY: 'visible'
    }
};

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
        this.props.onSubmit(value, fromAccount.id, toAccount);
    };

    render() {
        const { errors, onClose, fromAccount, classes } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.toAccount && this.state.value) {
            disabled = false;
        }

        return (
            <React.Fragment>

                <DialogContent className={classes.root}>

                    <TypographyError>
                        {errors.detail}
                    </TypographyError>

                    <div className={classes.formRow}>
                        <TextField
                            fullWidth
                            readOnly
                            disabled
                            label="De"
                            value={fromAccount.name}
                        />
                    </div>

                    <div className={classes.formRow}>
                        <AccountSelectPicker
                            autoFocus
                            label="Para"
                            placeholder="Escolha a conta destino"
                            error={errors.toAccount}
                            value={this.state.toAccount}
                            onChange={(toAccount) => this.setState({ toAccount })}
                        />
                    </div>

                    <div className={classes.formRow}>
                        <CurrencyTextField
                            fullWidth
                            label="Valor"
                            error={errors.value}
                            value={this.state.value}
                            onChangeEvent={(e, maskedValue, value) => this.setState({ value })}
                        />
                    </div>

                </DialogContent>

                <DialogActions>
                    <CancelButton onClick={onClose} />

                    <PrimaryButton disabled={disabled} onClick={this.handleSubmit}>
                        Salvar</PrimaryButton>
                </DialogActions>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TransferForm);
