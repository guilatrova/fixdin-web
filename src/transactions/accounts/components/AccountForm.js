import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PrimaryButton from '../../../common/components/PrimaryButton';
import CancelButton from '../../../common/components/CancelButton';
import TypographyError from '../../../common/material/TypographyError';
import TextFieldError from '../../../common/material/TextFieldError';

const styles = {
    contentWrapper: {
        marginTop: 20
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
            name: account.name || ""
        };
    }

    handleSubmit = () => this.props.onSubmit(this.state.id, { name: this.state.name });

    render() {
        const { errors, onClose, classes, account } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            if (this.state.name != account.name) { //If same name doesn't try to save
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

                        <TextFieldError
                            label="Nome"
                            error={errors.name}
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>

                </DialogContent>

                <DialogActions>
                    <CancelButton onClick={onClose} />

                    <PrimaryButton disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </PrimaryButton>
                </DialogActions>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AccountForm);
