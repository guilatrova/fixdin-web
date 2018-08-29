import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { types } from '../../../duck';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

const EditingPeriodicActions = ({ onClick, disabled, classes }) => {
    return (
        <div>
            <Button variant="raised" color="primary" onClick={() => onClick(types.SAVE_TRANSACTION)} disabled={disabled} className={classes.button}>
                Somenta esta</Button>
            <Button variant="raised" color="default" onClick={() => onClick(types.SAVE_THIS_AND_NEXT_TRANSACTIONS)} disabled={disabled} className={classes.button}>
                Esta e futuras</Button>
            <Button variant="raised" color="default" onClick={() => onClick(types.SAVE_ALL_PERIODIC_TRANSACTIONS)} disabled={disabled} className={classes.button}>
                Todas as recorrências</Button>
        </div>
    );
};

EditingPeriodicActions.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default withStyles(styles)(EditingPeriodicActions);
