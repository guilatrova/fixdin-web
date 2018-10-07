/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PayedSign from '../../../../common/components/PayedSign';

import EntryTableRow from './EntryTableRow';

const rowHeight = 40;
const rowsUntilScroll = 5;
const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2);
const widthSplitten = "25%";
const scrollbarWidth = 15;

const styles = () => ({
    row: {
        height: rowHeight
    },
    baseCell: {
        textAlign: 'center',
        backgroundColor: '#faf3f9',
        width: widthSplitten,
    },
    footerCell: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: widthSplitten,
    },
    highlightCell: {
        color: "red"
    },
    firstColumnCell: {
        textAlign: 'left !important',
        width: widthSplitten,
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: "12px",
        width: widthSplitten,
    },
    padScrollbar: {
        boxSizing: "border-box",
        paddingRight: scrollbarWidth
    },
    scrollable: {
        maxHeight: maxHeight,
        overflowY: "auto",
    }
});

const Headers = ({ classes }) => {
    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classNames(classes.headerCell, classes.firstColumnCell)}>Contas</TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                Receitas <PayedSign />
            </TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                Despesas <PayedSign pending />
            </TableCell>
            <TableCell padding="dense" numeric className={classes.headerCell}>Total</TableCell>
        </TableRow>
    );
};

const SimpleAccountsTable = ({ classes, names, values }) => {
    const rows = values.map(entry => (
        <EntryTableRow
            key={entry.account}
            name={names[entry.account]}
            entry={entry}
            classes={{
                row: classes.row,
                baseCell: classes.baseCell,
                firstColumnCell: classes.firstColumnCell,
                highlightCell: classes.highlightCell
            }}
        />
    ));

    const totals = values.reduce((prev, values) => {
        prev.incomes += values.incomes;
        prev.expenses += values.expenses;
        prev.total += values.total;

        return prev;
    }, {
            incomes: 0,
            expenses: 0,
            total: 0
        });

    const willScroll = rows.length > rowsUntilScroll;

    return (
        <div className={classes.root}>
            <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                <Table>
                    <TableHead>
                        <Headers classes={classes} />
                    </TableHead>
                </Table>
            </div>

            <div className={classes.scrollable}>
                <Table>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>

            <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                <Table className={classes.padScrollbar}>
                    <TableFooter>
                        <EntryTableRow entry={totals} name="Total" id="0" classes={classes} cellModifierClass={classes.footerCell} />
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

SimpleAccountsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    names: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleAccountsTable);
