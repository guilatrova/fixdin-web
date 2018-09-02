import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

const ToolbarOptions = ({ open }) => {
    return (
        <div>
            <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><NotificationsIcon /></IconButton>
            <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><SearchIcon /></IconButton>
            <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><SettingsIcon /></IconButton>
        </div>
    );
};

ToolbarOptions.propTypes = {
    open: PropTypes.bool.isRequired
};

export default ToolbarOptions;
