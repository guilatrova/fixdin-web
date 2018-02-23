import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalancePeriodTable from '../components/BalancePeriodTable';
import AggregatedAccountPeriodTable from '../components/AggregatedAccountPeriodTable';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts }) => {
    return (
        <div>
            <BalancePeriodTable
                period={period}
                incomes={totalIncomes}
                expenses={totalExpenses}
                total={total}
            />

            <AggregatedAccountPeriodTable 
                names={accountsName}
                values={aggregatedAccounts}
            />
        </div>
    );
};

BalanceHeader.propTypes = {
    total: PropTypes.number.isRequired,
    totalIncomes: PropTypes.number.isRequired,
    totalExpenses: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired
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