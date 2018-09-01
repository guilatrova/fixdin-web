import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        ...theme.mixins.orangeButton
    }
});

const PrimaryButton = ({ classes, children, className, ...props }) => (
    <Button variant="raised" className={cn(className, classes.button)} {...props}>
        {children}
    </Button>
);

PrimaryButton.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    ...Button.propTypes
};

export default withStyles(styles)(PrimaryButton);
