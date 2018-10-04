import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

import CurrencyTextField from '../../../common/material/CurrencyTextField';
import PrimaryButton from '../../../common/components/PrimaryButton';
import CancelButton from '../../../common/components/CancelButton';
import TypographyError from '../../../common/material/TypographyError';
import TextFieldError from '../../../common/material/TextFieldError';

const styles = {
    contentWrapper: {
        marginTop: 20
    },
    formRow: {
        marginBottom: 10
    },
    hiddenInput: {
        display: 'none'
    }
};

class AccountForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        account: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { account } = this.props;

        this.state = {
            id: account.id || null,
            name: account.name || "",
            start_balance: 0
        };
    }

    handleSubmit = () => {
        // eslint-disable-next-line no-unused-vars
        const { id, preview, avatarChanged, ...account } = this.state;
        this.props.onSubmit(id, account);
    }

    handleFileChange = (e) => {
        this.setState({
            avatar: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),
            avatarChanged: true
        });
    }

    render() {
        const { errors, onClose, classes, account } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            // If is all the same doesn't try to save
            if (this.state.name != account.name || this.state.avatarChanged) {
                disabled = false;
            }
        }

        return (
            <React.Fragment>

                <DialogContent>

                    <div className={classes.contentWrapper}>
                        <TypographyError>
                            {errors.detail}
                        </TypographyError>

                        <div className={classes.formRow}>
                            <img src={this.state.preview} />
                            <input
                                id="hidden-upload"
                                type="file"
                                accept="image/*"
                                className={classes.hiddenInput}
                                onChange={this.handleFileChange}
                            />
                            <label htmlFor="hidden-upload">
                                <Button component="span">
                                    <CloudUploadIcon />
                                    Upload
                                </Button>
                            </label>
                        </div>

                        <div className={classes.formRow}>
                            <TextFieldError
                                autoFocus
                                label="Nome"
                                error={errors.name}
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>

                        <div className={classes.formRow}>
                            <CurrencyTextField
                                label="Saldo inicial"
                                error={errors.start_balance}
                                value={this.state.start_balance}
                                onChangeEvent={(e, maskedValue, value) => this.setState({ start_balance: value })}
                            />
                        </div>
                    </div>

                </DialogContent>

                <DialogActions>
                    <CancelButton onClick={onClose} />

                    <PrimaryButton disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </PrimaryButton>
                </DialogActions>

            </React.Fragment >
        );
    }
}

export default withStyles(styles)(AccountForm);
