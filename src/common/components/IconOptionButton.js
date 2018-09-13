import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

const styles = {
    optionButton: {
        width: 48,
        height: 48
    },
    optionIcon: {
        maxWidth: 24,
        maxHeight: 24
    }
};

const IconOptionButton = ({ classes, onClick, src, children, ...props }) => {
    return (
        <IconButton onClick={onClick} className={classes.optionButton} {...props}>
            {src && <img src={src} className={classes.optionIcon} />}
            {children}
        </IconButton>
    );
};

IconOptionButton.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    src: PropTypes.node,
    children: PropTypes.node
};

export default withStyles(styles)(IconOptionButton);
