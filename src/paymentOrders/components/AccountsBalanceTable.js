import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';

import { formatCurrencyDisplay } from '../../utils/formatters';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors as accountSelectors } from '../../transactions/accounts/duck';

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

const AccountsBalanceTable = ({ classes, accountsNames, accountsBalances, totals }) => {
    const BalanceCells = ({render, className}) => {
        return accountsBalances.map(entry => {
            return (
                <TableCell numeric key={entry.account} padding="dense" className={className}>
                    {render(entry)}
                </TableCell>
            );
        });
    };

    const renderHeader = (entry) => accountsNames[entry.account] || entry.account;
    const renderIncomes = (entry) => formatCurrencyDisplay(entry.incomes);
    const renderExpenses = (entry) => formatCurrencyDisplay(entry.expenses);
    const renderTotals = (entry) => formatCurrencyDisplay(entry.total);

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
    accountsBalances: PropTypes.array.isRequired,
    accountsNames: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    accountsBalances: balanceSelectors.getDetailedAccounts(state),
    totals: balanceSelectors.getTotalsDetailedAccounts(state),
    accountsNames: accountSelectors.getAccountsNamesMappedById(state),
});

export default withStyles(styles)(
    connect(mapStateToProps)(AccountsBalanceTable)
);