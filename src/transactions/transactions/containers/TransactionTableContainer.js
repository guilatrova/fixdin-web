import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import TransactionTable from '../components/TransactionTable';
import TransactionTableBar from '../components/TransactionTableBar';

const ALL_TAB = 0;
const INCOMES_TAB = 1;
const EXPENSES_TAB = 2;

const styles = {
    tableWrapper: {
        overflow: 'auto'
    }
};

class TransactionTableContainer extends React.Component {
    static propTypes = {
        ...TransactionTable.propTypes,
        onAdd: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
        onClearAll: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    }

    state = {
        tab: ALL_TAB
    }

    handleTabChange = (e, value) => this.setState({ tab: value });

    render() {
        const { transactions, onAdd, onRefresh, onClearAll, classes, ...props } = this.props;
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
                <TransactionTableBar
                    tab={tab}
                    onAdd={onAdd}
                    onRefresh={onRefresh}
                    onClearAll={onClearAll}
                    onTabChange={this.handleTabChange}
                />

                <div className={classes.tableWrapper}>
                    <TransactionTable
                        transactions={shownTransactions}
                        {...props}
                    />
                </div>
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

export default withStyles(styles)(
    connect(mapStateToProps)(TransactionTableContainer)
);
