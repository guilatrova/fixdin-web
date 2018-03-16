import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors, operations } from '../duck';

const PendingBalanceTable = ({ period, incomes, expenses, total, onChangePeriod }) => {
    return (
        <BalanceSimpleTable
            period={period}
            onChangePeriod={onChangePeriod}
            incomesLabel="Receitas vencidas"
            expensesLabel="Despesas vencidas"
            expenses={expenses}
            incomes={incomes}
            total={total}
        />
    );
};

PendingBalanceTable.propTypes = {
    period: PropTypes.object.isRequired,
    incomes: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onChangePeriod: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ //TODO: RESOLVER DEFAULTS TEMPORÁRIO
    incomes: 0,
    total: 0,
    period: selectors.getPeriod(state),
    expenses: selectors.getSumOverdueExpenses(state)
});

const mapDispatchToProps = dispatch => ({
    onChangePeriod: (date) => dispatch(operations.changePeriod(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingBalanceTable);