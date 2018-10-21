import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RefreshIcon from '@material-ui/icons/Refresh';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import TransactionTable from '../components/TransactionTable';
import ActionableTableWrapper from '../../../common/components/ActionableTableWrapper';

const ALL_TAB = 0;
const INCOMES_TAB = 1;
const EXPENSES_TAB = 2;

class TransactionTableContainer extends React.Component {
    static propTypes = {
        ...TransactionTable.propTypes,
        onAdd: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
        onClearAll: PropTypes.func.isRequired
    }

    state = {
        tab: ALL_TAB
    }

    handleTabChange = (e, value) => this.setState({ tab: value });

    render() {
        const { transactions, onAdd, onRefresh, onClearAll, ...props } = this.props;
        const { tab } = this.state;

        let shownTransactions = transactions;
        if (tab === INCOMES_TAB) {
            shownTransactions = transactions.filter(t => t.kind == INCOME.id);
        }
        else if (tab === EXPENSES_TAB) {
            shownTransactions = transactions.filter(t => t.kind == EXPENSE.id);
        }

        const actions = [
            { onClick: onAdd, icon: <AddIcon /> },
            { onClick: onRefresh, icon: <RefreshIcon /> },
            { onClick: onClearAll, icon: <ClearAllIcon /> },
        ];

        return (
            <ActionableTableWrapper
                selectedTab={tab}
                onTabChange={this.handleTabChange}
                tabs={["Todas", "Receitas", "Despesas"]}
                title="OPERAÇÕES FINANCEIRAS REALIZADAS"
                actions={actions}
            >

                <TransactionTable
                    transactions={shownTransactions}
                    {...props}
                />

            </ActionableTableWrapper>
        );
    }
}

const mapStateToProps = state => ({
    transactions: selectors.getTransactionsToDisplay(state),
    categoriesNames: categorySelectors.getCategoriesNamesMappedById(state),
    accounts: accountSelectors.getAccounts(state),
    isFetching: selectors.isFetching(state),
    activeFilters: selectors.getActiveFilters(state)
});

export default connect(mapStateToProps)(TransactionTableContainer);
