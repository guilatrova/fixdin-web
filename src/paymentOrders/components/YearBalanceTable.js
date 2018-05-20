import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors } from '../duck';

const defaultBalance = {
    expenses: 0,
    incomes: 0,
    total: 0
};

const YearBalanceTable = ({ period, balance }) => {
    balance = balance || defaultBalance;

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
    balance: selectors.getYearBalance(state)
});

export default connect(mapStateToProps)(YearBalanceTable);