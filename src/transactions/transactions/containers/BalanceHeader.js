import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';

import BalancePeriodTable from '../components/BalancePeriodTable';
import AggregatedAccountPeriodTable from '../components/AggregatedAccountPeriodTable';
import LastMonthsChart from '../components/LastMonthsChart';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts }) => {
    return (
        <div>
            <Grid container spacing={8} justify="center">
                <Grid item xs={12} md={3}>
                    <BalancePeriodTable
                        period={period}
                        incomes={totalIncomes}
                        expenses={totalExpenses}
                        total={total}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <AggregatedAccountPeriodTable 
                        names={accountsName}
                        values={aggregatedAccounts}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <div style={{ width: "100%" }}>
                        <LastMonthsChart />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

BalanceHeader.propTypes = {
    total: PropTypes.number.isRequired,
    totalIncomes: PropTypes.number.isRequired,
    totalExpenses: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired,
    accountsName: PropTypes.array.isRequired,
    aggregatedAccounts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        total: selectors.getTotalValueOfDisplayedTransactions(state),
        totalExpenses: selectors.getTotalValueOfDisplayedExpenses(state),
        totalIncomes: selectors.getTotalValueOfDisplayedIncomes(state),
        period: selectors.getDisplayedPeriod(state),
        accountsName: accountSelectors.getAccountsNamesMappedById(state),
        aggregatedAccounts: selectors.getTotalValueOfDisplayedTransactionsGroupedByAccount(state)
    };
};

export default connect(mapStateToProps)(BalanceHeader);