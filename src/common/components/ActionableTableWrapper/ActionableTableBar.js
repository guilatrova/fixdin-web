import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import { Tabs, Tab } from '../../material/Tabs';
import MiniButton from '../MiniButton';

const styles = theme => ({
    bar: {
        position: "relative",
        padding: "10px 0 0 15px",
        boxSizing: "border-box",
        marginBottom: 10
    },
    tabsContainer: {
        zIndex: 1, // Don't let buttons containers prevent clicking it
        marginRight: "50%"
    },
    tabButton: {
        [theme.breakpoints.up('md')]: {
            minWidth: 90,
        },
    },
    buttonsContainer: {
        position: "absolute",
        boxSizing: "border-box",
        width: "calc(100% - 15px)", //parent padding
        top: "75%",

        display: "flex",
        flexDirection: "row-reverse",
        padding: "0 15px",
    }
});

const ActionableTableBar = ({ selectedTab, tabs, title, actions, onTabChange, classes }) => {
    const tabClasses = { classes: { root: classes.tabButton } };

    return (
        <AppBar position="static" className={classes.bar}>
            <Typography variant="subheading" color="secondary">
                {title}
            </Typography>

            <Tabs value={selectedTab} onChange={onTabChange} className={classes.tabsContainer}>
                {tabs.map((tab, idx) =>
                    <Tab key={idx} label={tab} {...tabClasses} />)}
            </Tabs>

            <div className={classes.buttonsContainer}>
                {actions.map((action, idx) =>
                    <MiniButton key={idx} onClick={action.onClick}>{action.icon}</MiniButton>)}
            </div>
        </AppBar>
    );
};

ActionableTableBar.propTypes = {
    classes: PropTypes.object.isRequired,
    tabs: PropTypes.array.isRequired,
    selectedTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        icon: PropTypes.node.isRequired
    }))
};

export default withStyles(styles)(ActionableTableBar);
