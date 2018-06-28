import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    addButton: {
        width: 25,
        height: 25,
        minHeight: 25, // Override button-root
        margin: 'auto'
    }
};

const AddButtonTableSuffix = ({ classes, ...props }) => {
    return (
        <Button 
            mini 
            variant="fab" 
            aria-label="add" 
            className={classes.addButton} 
            {...props}>

            <AddIcon />

        </Button>
    );
};

AddButtonTableSuffix.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(AddButtonTableSuffix);
