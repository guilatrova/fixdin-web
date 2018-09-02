import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import { getUserName } from '../../services/session';

const styles = {
    root: {
        paddingRight: 20
    },
    username: {
        textTransform: 'capitalize',
    },
    usernameText: {
        color: '#FFF'
    }
};

const ToolbarOptions = ({ classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.username}>
                <Typography variant="body2" className={classes.usernameText}>
                    {getUserName()}
                </Typography>
            </div>
        </div>
    );
};

ToolbarOptions.propTypes = {
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToolbarOptions);
