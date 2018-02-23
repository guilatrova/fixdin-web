import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

import { formatCurrencyDisplay } from '../../../services/formatter';

const styles = () => ({
    root: {
        maxWidth: 350
    },
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

const AggregatedAccountPeriodTable = ({ classes, names, values }) => {
    const rows = values.map(entry => {
        const idx = values.indexOf(entry);
        return (
            <TableRow key={idx} className={classes.row}>
                <TableCell>{names[idx] || "TOTAL"}</TableCell>
                <TableCell numeric className={classes.payedCell}>
                    {formatCurrencyDisplay(entry.totalIncomesPayed)}
                </TableCell>
                <TableCell numeric className={classes.pendingCell}>
                    {formatCurrencyDisplay(entry.totalIncomesPending)}
                </TableCell>
                <TableCell numeric className={classes.payedCell}>
                    {formatCurrencyDisplay(entry.totalExpensesPayed)}
                </TableCell>
                <TableCell numeric className={classes.pendingCell}>
                    {formatCurrencyDisplay(entry.totalExpensesPending)}
                </TableCell>
                <TableCell numeric className={classes.cell}>
                    {formatCurrencyDisplay(entry.balance)}
                </TableCell>
            </TableRow>
        );
    });
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>                    
                    <TableRow className={classes.row}>
                        <TableCell className={classes.strongCell}>Contas</TableCell>
                        <TableCell numeric className={classes.strongCell}>Receitas P</TableCell>
                        <TableCell numeric className={classes.strongCell}>Receitas NP</TableCell>
                        <TableCell numeric className={classes.strongCell}>Despesas P</TableCell>
                        <TableCell numeric className={classes.strongCell}>Despesas NP</TableCell>
                        <TableCell numeric className={classes.strongCell}>Saldo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}                    
                </TableBody>
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