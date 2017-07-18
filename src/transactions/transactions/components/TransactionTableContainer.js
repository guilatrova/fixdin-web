import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconButton from 'material-ui/IconButton';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';

import TransactionTable from './TransactionTable';

const styleSheet = createStyleSheet('TransactionTableContainer', theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    spacer: {
        flex: '1 1 50%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    }
}));

const TransactionTableContainer = ({ classes, title, children, onRefresh, onFilter, ...other }) => {
    return (
        <Paper className={classes.paper}>
            <Toolbar>
                <div className={classes.title}>
                    <Typography type="title">{title}</Typography>
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    <IconButton aria-label="Refresh" onClick={onRefresh}><RefreshIcon /></IconButton>
                    <IconButton aria-label="Filter list" onClick={onFilter}><FilterListIcon /></IconButton>
                </div>
            </Toolbar>
            <TransactionTable classes={classes} {...other} />
        </Paper>
    );
}

export default withStyles(styleSheet)(TransactionTableContainer);