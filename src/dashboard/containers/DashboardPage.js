import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { operations as balanceOperations, selectors as balanceSelectors } from './../../balances/duck';
import BalanceCard from './../../balances/components/BalanceCard';
import { operations as reportOperations, selectors as reportSelectors } from './../../reports/duck';
import ValuesByCategoryPieChartContainer from './../../reports/containers/ValuesByCategoryPieChartContainer';
import Last13MonthsChart from './../../reports/containers/Last13MonthsChartContainer';
import { EXPENSE, INCOME } from './../../transactions/kinds';
import TransactionList from './../../transactions/transactions/components/TransactionList';
import { formatCurrencyDisplay } from '../../services/formatter';

const styles = () => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    }
});

class DashboardPage extends React.Component {
    static propTypes = {
        onFetch: PropTypes.func.isRequired,
        balance: PropTypes.number.isRequired,
        realBalance: PropTypes.number.isRequired,
        expectedBalance: PropTypes.number.isRequired,
        overdueExpenses: PropTypes.array.isRequired,
        nextPendingExpenses: PropTypes.array.isRequired,
        overdueIncomes: PropTypes.array.isRequired,
        nextPendingIncomes: PropTypes.array.isRequired,
        incomesByCategory: PropTypes.array.isRequired,
        expensesByCategory: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.onFetch();
    }

    render() {
        const { classes } = this.props;
        const balance = formatCurrencyDisplay(this.props.balance);
        const realBalance = formatCurrencyDisplay(this.props.realBalance);
        const expectedBalance = formatCurrencyDisplay(this.props.expectedBalance);

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>

                    <Grid item xs={6} md={3}>
                        <BalanceCard title="Saldo">
                            {balance}
                        </BalanceCard>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <BalanceCard title="Saldo real">
                            {realBalance}
                        </BalanceCard>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <BalanceCard title="Saldo esperado">
                            {expectedBalance}
                        </BalanceCard>
                    </Grid>

                </Grid>                

                <Grid container spacing={24}>

                    <Grid item xs={12} xl={6}>
                        <Last13MonthsChart />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ValuesByCategoryPieChartContainer title="Despesas por categoria" data={this.props.expensesByCategory} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ValuesByCategoryPieChartContainer title="Receitas por categoria" data={this.props.incomesByCategory} />
                    </Grid>

                </Grid>

                <Grid container spacing={24}>
                    
                    <Grid item xs={12}>
                        <Typography variant="title">Próximas despesas</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography type="subheading">Despesas vencidas</Typography>
                        <TransactionList transactions={this.props.overdueExpenses} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography type="subheading">Despesas pendentes</Typography>
                        <TransactionList transactions={this.props.nextPendingExpenses} />
                    </Grid>

                </Grid>

                <Grid container spacing={24}>
                    
                    <Grid item xs={12}>
                        <Typography variant="title">Receitas pendentes</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography type="subheading">Receitas vencidas</Typography>
                        <TransactionList transactions={this.props.overdueIncomes} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography type="subheading">Próximas receitas</Typography>
                        <TransactionList transactions={this.props.nextPendingIncomes} />
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balance: balanceSelectors.getBalance(state) || 0,
        realBalance: balanceSelectors.getRealBalance(state) || 0,
        expectedBalance: balanceSelectors.getExpectedBalance(state) || 0,
        nextPendingExpenses: reportSelectors.getNextPendingExpenses(state),
        overdueExpenses: reportSelectors.getOverdueExpenses(state),
        nextPendingIncomes: reportSelectors.getNextPendingIncomes(state),
        overdueIncomes: reportSelectors.getOverdueIncomes(state),
        incomesByCategory: reportSelectors.getIncomesByCategory(state),
        expensesByCategory: reportSelectors.getExpensesByCategory(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(balanceOperations.fetchBalance());
            dispatch(balanceOperations.fetchRealBalance());
            dispatch(balanceOperations.fetchExpectedBalance());
            dispatch(reportOperations.fetchPendingTransactionsReport(EXPENSE));
            dispatch(reportOperations.fetchPendingTransactionsReport(INCOME));
            dispatch(reportOperations.fetchValuesByCategoryReport(INCOME));
            dispatch(reportOperations.fetchValuesByCategoryReport(EXPENSE));
        }
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
);