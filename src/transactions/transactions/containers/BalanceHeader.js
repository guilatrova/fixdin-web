import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from '../duck';
import BalancePeriodTable from '../components/BalancePeriodTable';

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total }) => {
    return (
        <div>
            <BalancePeriodTable
                period={period}
                incomes={totalIncomes}
                expenses={totalExpenses}
                total={total}
            />
        </div>
    );
};

BalanceHeader.PropTypes = {
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
        period: selectors.getDisplayedPeriod(state)
    };
};

export default connect(mapStateToProps)(BalanceHeader);