import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PrimaryButton from '../../../common/components/PrimaryButton';
import CancelButton from '../../../common/components/CancelButton';
import TextFieldError from '../../../common/material/TextFieldError';
import KindSwitch from '../../shared/components/KindSwitch';
import { getKind, EXPENSE } from '../../shared/kinds';

const styles = theme => ({
    kindSwitchWrapper: {
        display: 'flex',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        ...theme.mixins.orangeButton
    }
});

class CategoryForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        category: PropTypes.object.isRequired
    };

    static defaultProps = {
        errors: {},
        category: {
            id: 0,
            name: "",
            kind: EXPENSE.id
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.category,
            name: this.props.category.name || "",
            kind: getKind(this.props.category.kind) || EXPENSE
        };
    }

    handleSubmit = () => this.props.onSubmit(this.state);

    render() {
        const { errors, onCancel, classes } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name && this.state.kind) {
            disabled = false;
        }

        return (
            <React.Fragment>

                <DialogContent>

                    <div className={classes.kindSwitchWrapper}>
                        <KindSwitch
                            value={this.state.kind}
                            onChange={kind => this.setState({ kind })}
                        />
                    </div>

                    <TextFieldError
                        label="Nome"
                        error={errors.name}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        maxLength="70"
                    />

                </DialogContent>

                <DialogActions>
                    <CancelButton onClick={onCancel} />

                    <PrimaryButton disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </PrimaryButton>
                </DialogActions>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CategoryForm);
