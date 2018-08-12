import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import TransactionOverTimeTableBar from '../components/TransactionOverTimeTableBar';
import { operations, selectors } from '../duck';
import { selectors as accountsSelectors } from '../../transactions/accounts/duck';

const ALL_TAB = 0;
// const PAYED_TAB = 1;
// const PENDING_TAB = 2;

// const styles = {
//     tableWrapper: {
//         overflow: 'auto'
//     }
// };

class TransactionsOverTimeTableContainer extends React.Component {
    static propTypes = {
        ...TransactionsOverTimeTable.propTypes,
        isFetching: PropTypes.bool.isRequired
    }

    static defaultProps = {
        transactions: []
    }

    state = {
        tab: ALL_TAB
    }

    handleTabChange = (e, value) => this.setState({ tab: value });

    render() {
        const { nextExpenses, checked, onToggle, isFetching, accountNames } = this.props;
        const { tab } = this.state;

        if (isFetching) {
            return <CircularProgress />;
        }

        return (
            <div>
                <TransactionOverTimeTableBar
                    tab={tab}
                    onTabChange={this.handleTabChange}
                />

                <TransactionsOverTimeTable
                    transactions={nextExpenses}
                    checked={checked}
                    onToggle={onToggle}
                    accountNames={accountNames} />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    checked: selectors.getChecked(state),
    nextExpenses: selectors.getNextExpenses(state),
    isFetching: selectors.isFetching(state),
    accountNames: accountsSelectors.getAccountsNamesMappedById(state)
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => dispatch(operations.toggleExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverTimeTableContainer);