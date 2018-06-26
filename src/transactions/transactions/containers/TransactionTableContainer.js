import React from 'react';
import { connect } from 'react-redux';

import { selectors } from '../duck';
import { selectors as categorySelectors } from '../../categories/duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import TransactionTable from '../components/TransactionTable';
import { Tabs, Tab } from '../../../common/material/Tabs';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const ALL_TAB = 0;
const INCOMES_TAB = 1;
const EXPENSES_TAB = 2;

const styles = {
    bar: {
        position: "relative"
    },
    container: {
        position: "absolute",
        boxSizing: "border-box",
        width: "100%",
        top: "50%",

        display: "flex",
        flexDirection: "row-reverse",
        padding: "0 25px",
    }
};

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
        const { transactions, classes, ...props } = this.props;
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
                <AppBar position="static" className={classes.bar}>
                    <Tabs value={tab} onChange={this.handleTabChange}>
                        <Tab label="Todas" />
                        <Tab label="Receitas" />
                        <Tab label="Despesas" />
                    </Tabs>

                    <div className={classes.container}>
                        <Button mini variant="fab" aria-label="add">
                            <AddIcon />
                        </Button>
                    </div>
                </AppBar>

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

export default withStyles(styles)(
    connect(mapStateToProps)(TransactionTableContainer)
);
