import React from 'react';
import { connect } from 'react-redux';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import TransactionTable from '../components/TransactionTable';

class TransactionTableContainer extends React.Component {
    static propTypes = {
        ...TransactionTable.propTypes
    }
    
    render() {
        const { transactions, categoriesNames, accountsNames, isFetching } = this.props;

        return (
            <TransactionTable
                transactions={transactions}
                categoriesNames={categoriesNames}
                accountsNames={accountsNames}
                isFetching={isFetching}
                onRefresh={this.handleRefresh}
                onEdit={this.handleEdit}
                onPay={this.handlePay}
                onDelete={this.handleDelete}
                onCopy={this.handleCopy}
                activeFilters={this.props.activeFilters} />
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