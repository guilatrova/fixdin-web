import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: 300
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        margin: theme.spacing.unit,
        ...theme.mixins.orangeButton
    },
    cancelButton: {
        margin: theme.spacing.unit,
        color: theme.palette.text.secondary
    }
});

const FilterWrapper = ({ classes, children, onSubmit, onClear }) => {
    return (
        <div className={classes.root}>
            {children}

            <div className={classes.actions}>
                <Button onClick={onClear} className={classes.cancelButton}>Limpar</Button>
                <Button variant="raised" onClick={onSubmit} className={classes.button}>Aplicar</Button>
            </div>
        </div>
    );
};

FilterWrapper.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterWrapper);
