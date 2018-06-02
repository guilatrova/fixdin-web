import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import { selectors } from '../duck';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
    },
});

const PeriodicsDetailedTable = ({ classes, balances }) => {
    const BalanceCells = ({render, className}) => {
        return balances.map((entry, idx) => {
            return (
                <TableCell numeric key={idx} padding="dense" className={className}>
                    {render(entry)}
                </TableCell>
            );
        });
    };

    const totals = balances.reduce((prev, cur) => {//TODO: refactor - remove it from here
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
    const renderIncomes = (entry) => Math.round(entry.effective_incomes);
    const renderExpenses = (entry) => Math.round(entry.effective_expenses);
    const renderTotals = (entry) => Math.round(entry.effective_total);

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
                        <TableCell numeric padding="dense">{Math.round(totals.incomes)}</TableCell>
                    </TableRow>

                    <TableRow className={classes.row}>
                        <TableCell padding="dense">Despesas</TableCell>
                        <BalanceCells render={renderExpenses} />
                        <TableCell numeric padding="dense">{Math.round(totals.expenses)}</TableCell>
                    </TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Total</TableCell>
                        <BalanceCells render={renderTotals} className={classes.strongCell} />
                        <TableCell numeric padding="dense" className={classes.strongCell}>{Math.round(totals.total)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

PeriodicsDetailedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    balances: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    balances: selectors.getPeriods(state)
});

export default withStyles(styles)(
    connect(mapStateToProps)(PeriodicsDetailedTable)
);