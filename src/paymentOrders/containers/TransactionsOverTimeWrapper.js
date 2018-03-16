import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui/Progress';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import { operations, selectors } from '../duck';

const TransactionsOverTimeTableWrapper = ({nextExpenses, checked, onToggle, isFetching}) => {
    if (isFetching) {
        return <CircularProgress />;
    }

    return (
        <TransactionsOverTimeTable 
            transactions={nextExpenses} 
            checked={checked} 
            onToggle={onToggle} />
    );
};

TransactionsOverTimeTableWrapper.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    nextExpenses: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    checked: selectors.getChecked(state),
    nextExpenses: selectors.getNextExpenses(state),
    isFetching: selectors.isFetching(state)
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => dispatch(operations.toggleExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverTimeTableWrapper);