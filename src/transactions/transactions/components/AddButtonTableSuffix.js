import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    addButton: {
        width: 26,
        height: 26,
        minHeight: 26, // Override button-root
        margin: 'auto',
        ...theme.mixins.fab
    }
});

const AddButtonTableSuffix = ({ classes, ...props }) => {
    return (
        <Button
            mini
            variant="fab"
            aria-label="add"
            className={classes.addButton}
            {...props}>

            <AddIcon viewBox="0 -4 24 32" />

        </Button>
    );
};

AddButtonTableSuffix.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(AddButtonTableSuffix);
