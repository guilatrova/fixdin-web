import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';

import BalancePeriodTable from '../components/BalancePeriodTable';
import AggregatedAccountPeriodTable from '../components/AggregatedAccountPeriodTable';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts }) => {
    return (
        <div>
            <Grid container spacing={24}>
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
                    <img src="http://via.placeholder.com/200x150" />
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