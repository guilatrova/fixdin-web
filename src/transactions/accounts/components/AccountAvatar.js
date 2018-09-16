import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10
    }
};

const AccountAvatar = ({ classes, account }) => (
    <div className={classes.root}>
        <Avatar alt="account-avatar" src={account.avatar} className={classes.avatar}>
            {!account.avatar && <NotInterestedIcon />}
        </Avatar>
        {account.name}
    </div>
);

AccountAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountAvatar);
