import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

import { formatCurrencyDisplay } from '../../../services/formatter';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold'
    },
    payedCell: {
        color: red['A700'],
        whiteSpace: 'nowrap'
    },
    pendingCell: {
        color: green['A700'],
        whiteSpace: 'nowrap'
    },
    cell: {
        whiteSpace: 'nowrap'
    }
});

const EntryTableRow = (entry, name, id, classes, cellModifierClass) => {
    return (
        <TableRow key={id} className={classes.row}>
            <TableCell padding="dense" className={cellModifierClass}>{name}</TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass, classes.payedCell)}>
                {formatCurrencyDisplay(entry.totalIncomesPayed)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass, classes.pendingCell)}>
                {formatCurrencyDisplay(entry.totalIncomesPending)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass, classes.payedCell)}>
                {formatCurrencyDisplay(entry.totalExpensesPayed)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass, classes.pendingCell)}>
                {formatCurrencyDisplay(entry.totalExpensesPending)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass, classes.cell)}>
                {formatCurrencyDisplay(entry.balance)}
            </TableCell>
        </TableRow>
    );
};

const AggregatedAccountPeriodTable = ({ classes, names, values }) => {
    const rows = values.map(entry => {
        const idx = values.indexOf(entry);
        return EntryTableRow(entry, names[idx], idx, classes);
    });
    const footerRow = values.total ? EntryTableRow(values.total, "TOTAL", 0, classes, classes.strongCell) : null;

    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Contas</TableCell>
                        <TableCell padding="dense" className={classes.strongCell} numeric>Receitas P</TableCell>
                        <TableCell padding="dense" className={classes.strongCell} numeric>Receitas NP</TableCell>
                        <TableCell padding="dense" className={classes.strongCell} numeric>Despesas P</TableCell>
                        <TableCell padding="dense" className={classes.strongCell} numeric>Despesas NP</TableCell>
                        <TableCell padding="dense" className={classes.strongCell} numeric>Saldo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
                <TableFooter>
                    {footerRow}
                </TableFooter>
            </Table>
        </div>
    );
};

AggregatedAccountPeriodTable.propTypes = {
    classes: PropTypes.object.isRequired,
    names: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired
};

export default withStyles(styles)(AggregatedAccountPeriodTable);