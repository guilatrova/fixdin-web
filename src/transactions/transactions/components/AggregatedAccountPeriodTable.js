import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

import { formatCurrencyDisplay } from '../../../utils/formatters';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    payedCell: {
        color: green['A700'],
        whiteSpace: 'nowrap'
    },
    pendingCell: {
        color: red['A700'],
        whiteSpace: 'nowrap'
    },
    cell: {
        whiteSpace: 'nowrap'
    }
});

const Headers = (classes) => {
    const payedSign = <span className={classes.payedCell}>$</span>;
    const pendingSign = <span className={classes.pendingCell}>$</span>;
    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classes.strongCell}>Contas</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Receitas {payedSign}</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Receitas {pendingSign}</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Despesas {payedSign}</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Despesas {pendingSign}</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Saldo</TableCell>
        </TableRow>
    );
};

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
    const footerRow = values.total ? EntryTableRow(values.total, "Total", 0, classes, classes.strongCell) : null;    

    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    {Headers(classes)}
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