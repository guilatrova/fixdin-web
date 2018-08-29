import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import saveOptions from '../saveOptions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

const RegularActions = ({ onClick, disabled, classes }) => {
    return (
        <div>
            <Button variant="raised" color="primary" onClick={() => onClick(saveOptions.CLOSE)} disabled={disabled} className={classes.button}>
                Salvar</Button>
            <Button variant="raised" color="default" onClick={() => onClick(saveOptions.NEW)} disabled={disabled} className={classes.button}>
                Salvar e novo</Button>
        </div>
    );
};

RegularActions.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default withStyles(styles)(RegularActions);
