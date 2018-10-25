import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import cn from 'classnames';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10
    },
    miniAvatar: {
        width: 20,
        height: 20
    }
};

const AccountAvatar = ({ classes, account, mini }) => (
    <div className={classes.root}>
        <Avatar
            alt="account-avatar"
            src={account.avatar}
            className={cn(classes.avatar, { [classes.miniAvatar]: mini })}
        >
            {!account.avatar && <NotInterestedIcon />}
        </Avatar>
        {account.name}
    </div>
);

AccountAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    mini: PropTypes.bool
};

export default withStyles(styles)(AccountAvatar);
