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
        height: 40
    },
    strongCell: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    firstColumn: {
        textAlign: 'left !important'
    },
    basicCell: {
        textAlign: 'center',
        backgroundColor: '#faf3f9'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: "12px"
    }
});

const Headers = (classes) => {
    /* eslint-disable react/prop-types */
    const DetailedHeader = ({ title, subtitle, expense = false }) => <span>{title} <PayedSign pending={expense} /><br /> <small>{subtitle}</small></span>;

    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classNames(classes.header, classes.firstColumn)}>Contas</TableCell>
            <TableCell padding="dense" className={classes.header}>
                <DetailedHeader title="Receitas" subtitle="reais" />
            </TableCell>
            <TableCell padding="dense" className={classes.header}>
                <DetailedHeader title="Despesas" subtitle="reais" expense />
            </TableCell>
            <TableCell padding="dense" className={classes.header}>
                <DetailedHeader title="Receitas" subtitle="pendentes" />
            </TableCell>
            <TableCell padding="dense" className={classes.header}>
                <DetailedHeader title="Despesas" subtitle="pendentes" expense />
            </TableCell>
            <TableCell padding="dense" numeric className={classes.header}>Total</TableCell>
        </TableRow>
    );
};

const EntryTableRow = (entry, name, id, classes, cellModifierClass) => {
    return (
        <TableRow key={id} className={classes.row}>
            <TableCell padding="dense" className={classNames(cellModifierClass, classes.firstColumn)}>{name}</TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPayed)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPending)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPayed)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPending)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.balance)}
            </TableCell>
        </TableRow>
    );
};

const AggregatedAccountPeriodTable = ({ classes, names, values }) => {
    const rows = values.map(entry => {
        const idx = values.indexOf(entry);
        return EntryTableRow(entry, names[idx], idx, classes, classes.basicCell);
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