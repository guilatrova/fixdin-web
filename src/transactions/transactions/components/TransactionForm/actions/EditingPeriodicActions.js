import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { types } from '../../../duck';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        ...theme.mixins.orangeButton
    },
    cancelButton: {
        margin: theme.spacing.unit,
        color: theme.palette.text.secondary
    }
});

// TODO: Create a dialog to popup after save with options
const EditingPeriodicActions = ({ onClick, onCancel, disabled, classes }) => {
    return (
        <div>
            <Button onClick={() => onCancel()} className={classes.cancelButton}>
                Cancelar</Button>

            <Button variant="raised" disabled={disabled} className={classes.button}
                onClick={() => onClick(types.SAVE_TRANSACTION)}>
                Somenta esta</Button>

            <Button variant="raised" disabled={disabled} className={classes.button}
                onClick={() => onClick(types.SAVE_THIS_AND_NEXT_TRANSACTIONS)}>
                Esta e futuras</Button>

            <Button variant="raised" disabled={disabled} className={classes.button}
                onClick={() => onClick(types.SAVE_ALL_PERIODIC_TRANSACTIONS)}>
                Todas as recorrências</Button>
        </div>
    );
};

EditingPeriodicActions.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default withStyles(styles)(EditingPeriodicActions);
