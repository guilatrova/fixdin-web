import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import ActionableTableWrapper from '../../common/components/ActionableTableWrapper';
import { operations, selectors } from '../duck';
import { selectors as accountsSelectors } from '../../transactions/accounts/duck';
import specifications from '../specifications';

const ALL_TAB = 0;
const PAYED_TAB = 1;
const PENDING_TAB = 2;

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
        const { nextExpenses, checked, suggested, isFetching, accountNames } = this.props;
        const { onToggle, onResetSelectionToSuggestion } = this.props;
        const { tab } = this.state;

        if (isFetching) {
            return <CircularProgress />;
        }

        let shownExpenses = nextExpenses;
        if (tab == PAYED_TAB) {
            shownExpenses = nextExpenses.filter(transactionGroup => specifications.isEverythingToDate(transactionGroup));
        }
        else if (tab == PENDING_TAB) {
            shownExpenses = nextExpenses.filter(transactionGroup => specifications.isAnythingPending(transactionGroup));
        }

        return (
            <ActionableTableWrapper
                selectedTab={tab}
                onTabChange={this.handleTabChange}
                tabs={["Todas", "Pagas", "Não pagas"]}
                title="OPERAÇÕES FINANCEIRAS REALIZADAS"
            >

                <TransactionsOverTimeTable
                    transactions={shownExpenses}
                    accountNames={accountNames}
                    checked={checked}
                    suggested={suggested}
                    onToggle={onToggle}
                    onResetSelectionToSuggestion={onResetSelectionToSuggestion}
                />

            </ActionableTableWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    checked: selectors.getChecked(state),
    suggested: selectors.getSuggested(state),
    nextExpenses: selectors.getNextExpenses(state),
    isFetching: selectors.isFetching(state),
    accountNames: accountsSelectors.getAccountsNamesMappedById(state)
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => dispatch(operations.toggleExpense(id)),
    onResetSelectionToSuggestion: (ids) => dispatch(operations.resetSelectionToSuggestion(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverTimeTableContainer);
