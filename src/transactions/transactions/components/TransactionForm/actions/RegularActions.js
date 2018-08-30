import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import saveOptions from '../consts/saveOptions';

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

const RegularActions = ({ onClick, onCancel, disabled, classes }) => {
    return (
        <div>
            <Button onClick={() => onCancel()} className={classes.cancelButton}>
                Cancelar</Button>

            <Button variant="raised" onClick={() => onClick(saveOptions.CLOSE)} disabled={disabled} className={classes.button}>
                Salvar</Button>

            <Button variant="raised" onClick={() => onClick(saveOptions.NEW)} disabled={disabled} className={classes.button}>
                Salvar e novo</Button>
        </div>
    );
};

RegularActions.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default withStyles(styles)(RegularActions);
