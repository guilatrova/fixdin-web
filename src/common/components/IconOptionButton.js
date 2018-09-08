import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

const styles = {
    optionButton: {
        width: 30,
        height: 30
    },
    optionIcon: {
        maxWidth: 15,
        maxHeight: 15
    }
};

const IconOptionButton = ({ classes, onClick, src }) => {
    return (
        <IconButton onClick={onClick} className={classes.optionButton}>
            <img src={src} className={classes.optionIcon} />
        </IconButton>
    );
};

IconOptionButton.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    src: PropTypes.node,
};

export default withStyles(styles)(IconOptionButton);
