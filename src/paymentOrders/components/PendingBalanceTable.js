import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors, operations } from '../duck';

const PendingBalanceTable = ({ period, incomes, expenses, onChangePeriod }) => {
    return (
        <BalanceSimpleTable
            period={period}
            onChangePeriod={onChangePeriod}
            incomesLabel="Receitas vencidas"
            expensesLabel="Despesas vencidas"
            expenses={expenses}
            incomes={incomes}
            total={incomes+expenses}
        />
    );
};

PendingBalanceTable.propTypes = {
    period: PropTypes.object.isRequired,
    incomes: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    onChangePeriod: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    period: selectors.getPeriod(state),
    expenses: balanceSelectors.getPlainBalance(state, { pending: 1, output: 'expenses' }),
    incomes: balanceSelectors.getPlainBalance(state, { pending: 1, output: 'incomes' }),
});

const mapDispatchToProps = dispatch => ({
    onChangePeriod: (date) => dispatch(operations.changePeriod(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingBalanceTable);