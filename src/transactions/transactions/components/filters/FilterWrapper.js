import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        minWidth: 300,
        maxWidth: 500
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

const FilterWrapper = ({ classes, children, onSubmit, onClear, onClose }) => {
    return (
        <div className={classes.root}>
            {children}

            <div className={classes.actions}>
                <Button onClick={() => { onClear(); onClose(); }} className={classes.cancelButton}>
                    Limpar</Button>

                <Button onClick={() => { onSubmit(); onClose(); }} className={classes.button} variant="raised">
                    Aplicar</Button>
            </div>
        </div>
    );
};

FilterWrapper.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
};

FilterWrapper.defaultProps = {
    onClose: () => { }
};

export default withStyles(styles)(FilterWrapper);
