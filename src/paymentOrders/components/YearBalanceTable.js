import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors } from '../duck';

const YearBalanceTable = ({ period, balance }) => {
    const expenses = balance ? balance.expenses : 0;
    const incomes = balance ? balance.incomes : 0;
    const total = balance ? balance.total : 0;
    return (
        <BalanceSimpleTable
            period={period}
            expenses={expenses}
            incomes={incomes}
            total={total}
        />
    );
};

YearBalanceTable.propTypes = {
    period: PropTypes.object.isRequired,
    balance: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    period: selectors.getPeriod(state),
    balance: balanceSelectors.getAccumulatedBalance(state)
});

export default connect(mapStateToProps)(YearBalanceTable);