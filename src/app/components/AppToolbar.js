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
import NotificationsIcon from '@material-ui/icons/Notifications';

import { drawerWidth, anchor, title } from '../contants';

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
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
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

const AppToolbar = ({ classes, open, handleDrawerOpen }) => {
    return (
        <AppBar
            className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
                [classes[`appBarShift-${anchor}`]]: open,
            })}
        >
            <Toolbar disableGutters={!open}>
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton)}
                >
                    <MenuIcon />
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
    handleDrawerOpen: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppToolbar);