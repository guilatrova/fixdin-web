import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BalanceSimpleTable from '../../balances/components/BalanceSimpleTable';
import { selectors } from '../duck';

const PendingBalanceTable = ({ period, incomes, expenses, total }) => {
    return (
        <BalanceSimpleTable
            period={period}
            incomesLabel="Receitas vencidas"
            expensesLabel="Despesas vencidas"
            expenses={expenses}
            incomes={incomes}
            total={total}
        />
    );
};

PendingBalanceTable.propTypes = {
    period: PropTypes.string.isRequired,
    incomes: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({ //TODO: RESOLVER DEFAULTS TEMPORÁRIO
    period: "mar-2018",
    incomes: 0,
    total: 0,
    expenses: selectors.getSumPendingExpenses(state)
});

export default connect(mapStateToProps)(PendingBalanceTable);