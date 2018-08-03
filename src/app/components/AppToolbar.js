import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { title } from '../contants';

const styles = theme => ({
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    title: {
        flex: 1
    }
});

const AppToolbar = ({ classes, open, handleDrawerOpen, handleDrawerClose }) => {
    return (
        <AppBar className={classes.appBar}>
            <Toolbar disableGutters={true}>
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                    className={classNames(classes.menuButton)}
                >
                    {!open && <MenuIcon />}
                    {open && <ChevronLeftIcon />}
                </IconButton>

                <Typography variant="title" color="inherit" className={classes.title} noWrap>
                    $ <span className="logo">{title}</span>
                </Typography>

                <div>
                    <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><NotificationsIcon /></IconButton>
                    <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><SearchIcon /></IconButton>
                    <IconButton color="secondary" aria-owns={open ? 'menu-appbar' : null}><SettingsIcon /></IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

AppToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppToolbar);