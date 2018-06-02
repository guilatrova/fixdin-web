import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
		margin: theme.spacing.unit,
		position: 'fixed',
		bottom: 10,
		right: 10
	}
});

const FloatActionButton = ({ children, classes, ...props }) => {
    return (
        <Button variant="fab" aria-label="add" className={classes.button} {...props}>
            {children || <AddIcon />}
        </Button>
    );
};

FloatActionButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

FloatActionButton.defaultProps = {
    color: 'primary'
};

export default withStyles(styles)(FloatActionButton);