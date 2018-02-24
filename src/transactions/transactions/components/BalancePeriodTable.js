import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import red from 'material-ui/colors/red';

import { formatCurrencyDisplay } from '../../../services/formatter';

const styles = theme => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    periodCell: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    expenseCell: {
        color: red['A700'],
        whiteSpace: 'nowrap'
    },
    valueCell: {
        fontSize: 20,
        whiteSpace: 'nowrap'
    }
});

const BalancePeriodTable = ({ classes, period, incomes, expenses, total }) => {
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Balanço</TableCell>
                        <TableCell padding="dense" numeric className={classes.periodCell}>{period}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense">Receitas</TableCell>
                        <TableCell padding="dense" numeric className={classes.valueCell}>{formatCurrencyDisplay(incomes)}</TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense">Despesas</TableCell>
                        <TableCell padding="dense" numeric className={classNames(classes.valueCell, classes.expenseCell)}>{formatCurrencyDisplay(expenses)}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Resultado</TableCell>
                        <TableCell padding="dense" numeric className={classNames(classes.strongCell, classes.valueCell)}>{formatCurrencyDisplay(total)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

BalancePeriodTable.propTypes = {
    classes: PropTypes.object.isRequired,
    period: PropTypes.string.isRequired,
    incomes: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default withStyles(styles)(BalancePeriodTable);