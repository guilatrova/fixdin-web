import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors } from '../duck';

const YearBalanceTable = ({ period, balance }) => {
    if (!balance) return null; //TODO: improve this

    return (
        <BalanceSimpleTable
            period={period}
            expenses={balance.expenses}
            incomes={balance.incomes}
            total={balance.total}
        />
    );
};

YearBalanceTable.propTypes = {
    period: PropTypes.object.isRequired,
    balance: PropTypes.object
};

YearBalanceTable.defaultProps = {
    balance: {
        expenses: 0,
        incomes: 0,
        total: 0
    }
};


const mapStateToProps = state => ({
    period: selectors.getPeriod(state),
    balance: balanceSelectors.getAccumulatedBalance(state)
});

export default connect(mapStateToProps)(YearBalanceTable);