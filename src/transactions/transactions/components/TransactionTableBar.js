import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Tabs, Tab } from '../../../common/material/Tabs';

const styles = theme => ({
    bar: {
        position: "relative",
        padding: "10px 0 0 15px",
        boxSizing: "border-box",
        marginBottom: 10
    },
    button: {
        margin: "0 5px",
        ...theme.mixins.fab
    },
    tabsContainer: {
        zIndex: 1 // Don't let buttons containers prevent clicking it
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

const TransactionTableBar = ({ tab, classes, onTabChange, onAdd, onRefresh, onClearAll }) => {
    /* eslint-disable react/prop-types */
    const MiniButton = ({ children, onClick }) => {
        return (
            <Button mini variant="fab" aria-label="add"
                onClick={onClick}
                className={classes.button}>
                {children}
            </Button>
        );
    };

    const tabClasses = { classes: { root: classes.tabButton } };

    return (
        <AppBar position="static" className={classes.bar}>
            <Typography variant="subheading" color="secondary">
                OPERAÇÕES FINANCEIRAS REALIZADAS
            </Typography>

            <Tabs value={tab} onChange={onTabChange} className={classes.tabsContainer}>
                <Tab label="Todas" {...tabClasses} />
                <Tab label="Receitas" {...tabClasses} />
                <Tab label="Despesas" {...tabClasses} />
            </Tabs>

            <div className={classes.buttonsContainer}>
                <MiniButton onClick={onAdd}><AddIcon /></MiniButton>
                <MiniButton onClick={onRefresh}><RefreshIcon /></MiniButton>
                <MiniButton onClick={onClearAll} ><ClearAllIcon /></MiniButton>
            </div>
        </AppBar>
    );
};

TransactionTableBar.propTypes = {
    tab: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    onTabChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionTableBar);
