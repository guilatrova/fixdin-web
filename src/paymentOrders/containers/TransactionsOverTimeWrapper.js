import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CircularProgress } from '@material-ui/core/Progress';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import { operations, selectors } from '../duck';
import { selectors as accountsSelectors } from '../../transactions/accounts/duck';

const TransactionsOverTimeTableWrapper = ({nextExpenses, checked, onToggle, isFetching, accountNames}) => {
    if (isFetching) {
        return <CircularProgress />;
    }

    return (
        <TransactionsOverTimeTable 
            transactions={nextExpenses} 
            checked={checked} 
            onToggle={onToggle}
            accountNames={accountNames} />
    );
};

TransactionsOverTimeTableWrapper.propTypes = {
    ...TransactionsOverTimeTable.propTypes,
    isFetching: PropTypes.bool.isRequired
};

TransactionsOverTimeTableWrapper.defaultProps = {
    transactions: []
};

const mapStateToProps = (state) => ({
    checked: selectors.getChecked(state),
    nextExpenses: selectors.getNextExpenses(state),
    isFetching: selectors.isFetching(state),
    accountNames: accountsSelectors.getAccountsNamesMappedById(state)
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => dispatch(operations.toggleExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverTimeTableWrapper);