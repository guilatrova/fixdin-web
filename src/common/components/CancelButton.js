import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    cancelButton: {
        margin: theme.spacing.unit,
        color: theme.palette.text.secondary
    }
});

const CancelButton = ({ classes, children, className, ...props }) => (
    <Button className={cn(className, classes.cancelButton)} {...props}>
        {children}
    </Button>
);

CancelButton.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    ...Button.propTypes
};

CancelButton.defaultProps = {
    children: "Cancelar"
};

export default withStyles(styles)(CancelButton);
