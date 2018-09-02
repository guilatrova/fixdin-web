import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { headerHeight } from '../contants';
import logoSrc from '../../styles/icons/logo-white.png';
import ToolbarOptions from './ToolbarOptions';

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
    logo: {
        height: headerHeight - 20
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    logoWrapper: {
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

                <div className={classes.logoWrapper}>
                    <img src={logoSrc} className={classes.logo} />
                </div>

                <ToolbarOptions />
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