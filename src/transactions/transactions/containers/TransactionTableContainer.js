import React from 'react';
import { connect } from 'react-redux';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import TransactionTable from '../components/TransactionTable';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TransactionTableContainer extends React.Component {
    static propTypes = {
        ...TransactionTable.propTypes
    }

    state = {
        tab: 0
    }

    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    };

    render() {
        const { transactions, categoriesNames, accountsNames, isFetching } = this.props;
        const { tab } = this.state;

        let shownTransactions = transactions;
        if ( tab === 1 ) {
            shownTransactions = transactions.filter(t => t.kind == INCOME.id);
        }
        else if (tab === 2) {
            shownTransactions = transactions.filter(t => t.kind == EXPENSE.id);
        }

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={tab} onChange={this.handleTabChange}>
                        <Tab label="Todas" />
                        <Tab label="Receitas" />
                        <Tab label="Despesas" />
                    </Tabs>
                </AppBar>

                <TransactionTable
                    transactions={shownTransactions}
                    categoriesNames={categoriesNames}
                    accountsNames={accountsNames}
                    isFetching={isFetching}
                    onRefresh={this.handleRefresh}
                    onEdit={this.handleEdit}
                    onPay={this.handlePay}
                    onDelete={this.handleDelete}
                    onCopy={this.handleCopy}
                    activeFilters={this.props.activeFilters} />
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
