import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: "0 5px",
        ...theme.mixins.fab
    }
});

const MiniButton = ({ classes, children, onClick }) => {
    return (
        <Button mini variant="fab" aria-label="add"
            onClick={onClick}
            className={classes.button}>
            {children}
        </Button>
    );
};

MiniButton.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(MiniButton);
