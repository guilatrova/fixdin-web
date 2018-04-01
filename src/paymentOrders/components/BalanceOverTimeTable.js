import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';

import { formatCurrencyDisplay } from '../../utils/formatters';
import { selectors as reportSelectors } from '../../reports/duck';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
    },
});

const BalanceOverTimeTable = ({ classes, balances }) => {
    const BalanceCells = ({render, className}) => {
        return balances.map((entry, idx) => {
            return (
                <TableCell numeric key={idx} padding="dense" className={className}>
                    {render(entry)}
                </TableCell>
            );
        });
    };

    const totals = balances.reduce((prev, cur) => {
        prev.incomes += Number(cur.effective_incomes);
        prev.expenses += Number(cur.effective_expenses);
        prev.total += Number(cur.effective_total);

        return prev;
    }, {
        incomes: 0,
        expenses: 0,
        total: 0
    });

    const renderHeader = (entry) => moment(entry.period, 'YYYY-MM-DD').format('MMM-YY');
    const renderIncomes = (entry) => formatCurrencyDisplay(entry.effective_incomes);
    const renderExpenses = (entry) => formatCurrencyDisplay(entry.effective_expenses);
    const renderTotals = (entry) => formatCurrencyDisplay(entry.effective_total);

    return (
        <div className={classes.root}>
            <Table className="slim-table">
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Período</TableCell>
                        <BalanceCells render={renderHeader} className={classes.strongCell} />
                        <TableCell numeric padding="dense" className={classes.strongCell}>Saldo</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense">Receitas</TableCell>
                        <BalanceCells render={renderIncomes} />
                        <TableCell numeric padding="dense">{formatCurrencyDisplay(totals.incomes)}</TableCell>
                    </TableRow>

                    <TableRow className={classes.row}>
                        <TableCell padding="dense">Despesas</TableCell>
                        <BalanceCells render={renderExpenses} />
                        <TableCell numeric padding="dense">{formatCurrencyDisplay(totals.expenses)}</TableCell>
                    </TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Total</TableCell>
                        <BalanceCells render={renderTotals} className={classes.strongCell} />
                        <TableCell numeric padding="dense" className={classes.strongCell}>{formatCurrencyDisplay(totals.total)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

BalanceOverTimeTable.propTypes = {
    classes: PropTypes.object.isRequired,
    balances: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    balances: reportSelectors.getLastMonths(state)
});

export default withStyles(styles)(
    connect(mapStateToProps)(BalanceOverTimeTable)
);