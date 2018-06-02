import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import { formatCurrencyDisplay } from '../../../utils/formatters';
import { selectors as balanceSelectors } from '../../../balances/duck';
import { selectors } from '../duck';

const styles = () => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    expenseCell: {
        // color: red['A700'],
        whiteSpace: 'nowrap'
    },
});

const AccountsBalanceTable = ({ classes, names, balances, totals }) => {
    const BalanceCells = ({render, className}) => {
        return balances.map(entry => {
            return (
                <TableCell numeric key={entry.account} padding="dense" className={className}>
                    {render(entry)}
                </TableCell>
            );
        });
    };

    const renderHeader = (entry) => names[entry.account] || entry.account;
    const renderIncomes = (entry) => formatCurrencyDisplay(entry.incomes, false);
    const renderExpenses = (entry) => formatCurrencyDisplay(entry.expenses, false);
    const renderTotals = (entry) => formatCurrencyDisplay(entry.total, false);

    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Contas</TableCell>
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

AccountsBalanceTable.propTypes = {
    classes: PropTypes.object.isRequired,
    balances: PropTypes.array.isRequired,
    names: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    balances: balanceSelectors.getDetailedAccounts(state),
    totals: balanceSelectors.getTotalsDetailedAccounts(state),
    names: selectors.getAccountsNamesMappedById(state),
});

export default withStyles(styles)(
    connect(mapStateToProps)(AccountsBalanceTable)
);