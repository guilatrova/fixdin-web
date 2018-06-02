import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import { formatCurrencyDisplay } from '../../../utils/formatters';
import PayedSign from '../../../common/components/PayedSign';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold'
    }
});

const Headers = (classes) => {
    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classes.strongCell}>Contas</TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Receitas <PayedSign /></TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Receitas <PayedSign pending /></TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Despesas <PayedSign /></TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Despesas <PayedSign pending /></TableCell>
            <TableCell padding="dense" className={classes.strongCell} numeric>Saldo</TableCell>
        </TableRow>
    );
};

const EntryTableRow = (entry, name, id, classes, cellModifierClass) => {
    return (
        <TableRow key={id} className={classes.row}>
            <TableCell padding="dense" className={cellModifierClass}>{name}</TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPayed)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPending)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPayed)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPending)}
            </TableCell>
            <TableCell padding="dense" numeric className={classNames(cellModifierClass)}>
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