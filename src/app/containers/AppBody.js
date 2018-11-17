import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import AppToolbar from '../components/AppToolbar';
import AppDrawer from '../components/AppDrawer';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { drawerWidth, headerHeight, anchor } from '../contants';

const styles = theme => ({
    root: {
        width: '100%',
        zIndex: 1,
        overflow: 'hidden'
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    content: {
        boxSizing: "border-box",
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: `calc(100% - ${headerHeight}px)`,
        marginTop: headerHeight,
        padding: 30,
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class AppBody extends React.Component {
    state = {
        open: true,
    };

    handleDrawerOpen = () => this.setState({ open: true });

    handleDrawerClose = () => this.setState({ open: false });

    render() {
        const { classes, children } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>

                    <AppToolbar open={open} handleDrawerOpen={this.handleDrawerOpen} handleDrawerClose={this.handleDrawerClose} />

                    <AppDrawer open={open} handleDrawerClose={this.handleDrawerClose} />

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <main
                            className={classNames(classes.content, classes[`content-${anchor}`], {
                                [classes.contentShift]: open,
                                [classes[`contentShift-${anchor}`]]: open,
                            })}
                        >
                            {children}
                        </main>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    }
}

AppBody.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default withStyles(styles, { withTheme: true })(AppBody);
