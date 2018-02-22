import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import red from 'material-ui/colors/red';

import { formatCurrencyDisplay } from '../../../services/formatter';

const styles = theme => ({
    root: {
        maxWidth: 300
    },
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold'
    },
    periodCell: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    expenseCell: {
        color: red['A700']
    },
    valueCell: {
        fontSize: 20
    }
});

const BalancePeriodTable = ({ classes, period, incomes, expenses }) => {
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.strongCell}>Balanço</TableCell>
                        <TableCell numeric className={classes.periodCell}>{period}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell>Receitas</TableCell>
                        <TableCell numeric className={classes.valueCell}>{formatCurrencyDisplay(incomes)}</TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                        <TableCell>Despesas</TableCell>
                        <TableCell numeric className={classNames(classes.valueCell, classes.expenseCell)}>{formatCurrencyDisplay(expenses)}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.strongCell}>Resultado</TableCell>
                        <TableCell numeric className={classNames(classes.strongCell, classes.valueCell)}>{formatCurrencyDisplay(incomes + expenses)}</TableCell>
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
    expenses: PropTypes.number.isRequired
};

export default withStyles(styles)(BalancePeriodTable);