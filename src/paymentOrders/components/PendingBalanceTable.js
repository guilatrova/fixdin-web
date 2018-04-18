import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors, operations } from '../duck';

const PendingBalanceTable = ({ period, detailedBalance, onChangePeriod }) => {
    return (
        <BalanceSimpleTable
            period={period}
            onChangePeriod={onChangePeriod}
            incomesLabel="Receitas vencidas"
            expensesLabel="Despesas vencidas"
            expenses={detailedBalance.expenses}
            incomes={detailedBalance.incomes}
            total={detailedBalance.total}
        />
    );
};

PendingBalanceTable.propTypes = {
    period: PropTypes.object.isRequired,
    detailedBalance: PropTypes.object.isRequired,
    onChangePeriod: PropTypes.func.isRequired
};

PendingBalanceTable.defaultProps = {
    detailedBalance: {
        expenses: 0,
        incomes: 0,
        total: 0
    }
};

const mapStateToProps = state => ({
    period: selectors.getPeriod(state),
    detailedBalance: balanceSelectors.getDetailedBalance(state, { pending: 1 }),
});

const mapDispatchToProps = dispatch => ({
    onChangePeriod: (date) => dispatch(operations.changePeriod(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingBalanceTable);