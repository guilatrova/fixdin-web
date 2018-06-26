import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

import { Tabs, Tab } from '../../../common/material/Tabs';

const styles = {
    bar: {
        position: "relative"
    },
    button: {
        margin: "0 5px"
    },
    container: {
        position: "absolute",
        boxSizing: "border-box",
        width: "100%",
        top: "50%",

        display: "flex",
        flexDirection: "row-reverse",
        padding: "0 25px",
    }
};

const TransactionTableBar = ({ tab, classes, onTabChange }) => {
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

    return (
        <AppBar position="static" className={classes.bar}>
            <Tabs value={tab} onChange={onTabChange}>
                <Tab label="Todas" />
                <Tab label="Receitas" />
                <Tab label="Despesas" />
            </Tabs>

            <div className={classes.container}>
                <MiniButton><AddIcon /></MiniButton>
                <MiniButton><RefreshIcon /></MiniButton>
                <MiniButton><ClearAllIcon /></MiniButton>
            </div>
        </AppBar>
    );
};

TransactionTableBar.propTypes = {
    tab: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionTableBar);
