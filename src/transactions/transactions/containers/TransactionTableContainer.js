import React from 'react';
import { connect } from 'react-redux';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import TransactionTable from '../components/TransactionTable';
import TransactionTableBar from '../components/TransactionTableBar';

const ALL_TAB = 0;
const INCOMES_TAB = 1;
const EXPENSES_TAB = 2;

class TransactionTableContainer extends React.Component {
    static propTypes = {
        ...TransactionTable.propTypes
    }

    state = {
        tab: ALL_TAB
    }

    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    };

    render() {
        const { transactions,  ...props } = this.props;
        const { tab } = this.state;

        let shownTransactions = transactions;
        if (tab === INCOMES_TAB) {
            shownTransactions = transactions.filter(t => t.kind == INCOME.id);
        }
        else if (tab === EXPENSES_TAB) {
            shownTransactions = transactions.filter(t => t.kind == EXPENSE.id);
        }

        return (
            <div>
                <TransactionTableBar tab={tab} onTableChange={this.handleTabChange} />

                <TransactionTable
                    transactions={shownTransactions}
                    {...props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    transactions: selectors.getTransactionsToDisplay(state),
    categoriesNames: categorySelectors.getCategoriesNamesMappedById(state),
    accountsNames: accountSelectors.getAccountsNamesMappedById(state),
    isFetching: selectors.isFetching(state),
    activeFilters: selectors.getActiveFilters(state)
});

export default connect(mapStateToProps)(TransactionTableContainer);
