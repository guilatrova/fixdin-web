/* eslint-disable no-fallthrough */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RefreshIcon from '@material-ui/icons/Refresh';

import { EXPENSE, INCOME } from '../../shared/kinds';
import FloatingActionButton from '../../../common/material/FloatingActionButton';
import TransactionTable from './TransactionTableContainer';
import TransactionFormDialog from './TransactionFormDialog';
import * as saveOptions from './../components/TransactionForm';
import ConfirmDeleteDialog from './../components/ConfirmDeleteDialog';
import { operations, types, selectors } from '../duck';
import { operations as categoryOperations, selectors as categorySelectors } from '../../categories/duck';
import { operations as accountsOperations, selectors as accountSelectors } from '../../accounts/duck';
import { operations as reportOperations } from '../../../reports/duck';
import specifications from '../specifications';
import BalanceHeader from './BalanceHeader';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
      overflow: 'hidden',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    },
    table: {
        overflowX: 'auto',        
    },
    spacer: {
        flex: '1 1 50%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    }
});

class TransactionPage extends React.Component {
    static propTypes = {
        accounts: PropTypes.array.isRequired,
        transactions: PropTypes.array.isRequired,
        categoriesNames: PropTypes.array.isRequired,
        accountsNames: PropTypes.array.isRequired,
        editingTransaction: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        errors: PropTypes.object,
        classes: PropTypes.object,
        activeFilters: PropTypes.object.isRequired,

        onPay: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,
        onClearFilters: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCopy: PropTypes.func.isRequired,
        onFinishEdit: PropTypes.func.isRequired,
    }

    state = {
        openTransactionFormDialog: false,
        openDeleteDialog: false
    }

    componentDidMount() {
        this.props.onFetch();
    }

    handleRefresh = () => this.props.onFetch(0);

    handleCreateTransaction = () => this.setState({ openTransactionFormDialog: true });

    handleHideTransactionFormModal = () => {
        this.props.onFinishEdit();
        this.setState({ openTransactionFormDialog: false });
    }

    handleTransactionFormSubmit = (type, option, transaction) => {
        this.props.onSubmit(transaction, type).then(({result}) => {
            if (result == 'success') {

                switch(option) {
                    case saveOptions.CLOSE:
                        this.setState({ openTransactionFormDialog: false });

                    default:
                        this.props.onFinishEdit();
                        break;
                }
            }
        });
    }

    handleCopy = id => {
        this.setState({ openTransactionFormDialog: true });
        this.props.onCopy(id);
    }

    handleEdit = id => {
        this.setState({ openTransactionFormDialog: true });
        this.props.onEdit(id);
    }

    handlePay = id => {
        const transaction = this.props.transactions.find(transaction => transaction.id == id);
        const revertPayment = !!transaction.payment_date;
        this.props.onPay(id, revertPayment);
    }

    handleDelete = id => {
        const foundTransaction = this.props.transactions.find(transaction => transaction.id == id);
        const toDeletePeriodicTransaction = specifications.isPeriodic(foundTransaction) ? foundTransaction.bound_transaction : null;

        this.setState({
            openDeleteDialog: true,
            toDeleteId: id,
            toDeletePeriodicTransaction
        });
    }

    handleConfirmDelete = type => {
        const id = (type == types.DELETE_ALL_PERIODIC_TRANSACTIONS) ? this.state.toDeletePeriodicTransaction : this.state.toDeleteId;

        this.props.onDelete(id, type).then(({result}) => {
            if (result == 'success') {
                this.setState({
                    openDeleteDialog: false,
                    toDeleteId: undefined,
                    toDeletePeriodicTransaction: undefined
                });
            }
        });
    }

    handleHideDeleteModal = () => {
        this.props.onFinishEdit();
        this.setState({
            openDeleteDialog: false,
            toDeleteId: undefined,
            toDeletePeriodicTransaction: undefined
        });
    }

    handleClearFilters = () => this.props.onClearFilters();

    render() {
        const { isFetching, classes } = this.props;

        return (
            <div className={classes.root}>

                <BalanceHeader />

                <Paper className={classes.paper}>

                    <Toolbar>
                        <div className={classes.actions}>
                            <IconButton aria-label="Refresh" onClick={this.handleRefresh} disabled={isFetching}><RefreshIcon /></IconButton>
                            <IconButton aria-label="Filter list" onClick={this.handleClearFilters}><ClearAllIcon /></IconButton>
                        </div>
                    </Toolbar>

                    <div className={classes.table}>

                        <TransactionTable
                            onRefresh={this.handleRefresh}
                            onEdit={this.handleEdit}
                            onPay={this.handlePay}
                            onDelete={this.handleDelete}
                            onCopy={this.handleCopy} />
                    </div>

                </Paper>

                <BalanceHeader />

                <TransactionFormDialog
                    open={this.state.openTransactionFormDialog}
                    onClose={this.handleHideTransactionFormModal}
                    title={this.props.editingTransaction.id ? `Editar` : `Criar`}

                    onSubmit={this.handleTransactionFormSubmit}
                    isFetching={isFetching}
                    errors={this.props.errors}
                    transaction={Object.keys(this.props.editingTransaction).length > 0 ? this.props.editingTransaction : undefined}
                    accounts={this.props.accounts}
                />

                <ConfirmDeleteDialog
                    open={this.state.openDeleteDialog}
                    onClose={this.handleHideDeleteModal}
                    onConfirm={this.handleConfirmDelete}
                    isPeriodic={!!this.state.toDeletePeriodicTransaction}
                    error={this.props.errors['detail']}>

                    Tem certeza que deseja deletar esta movimentação?
                </ConfirmDeleteDialog>

                <FloatingActionButton onClick={this.handleCreateTransaction} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editingTransaction: selectors.getEditingTransaction(state),
        isFetching: selectors.isFetching(state),
        accounts: accountSelectors.getAccounts(state),
        errors: {
            ...selectors.getErrors(state),
            category: categorySelectors.getNameError(state)
        },
        activeFilters: selectors.getActiveFilters(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(categoryOperations.fetchCategories(INCOME));
            dispatch(categoryOperations.fetchCategories(EXPENSE));
            dispatch(operations.fetchTransactions());
            dispatch(accountsOperations.fetchAccounts());
            dispatch(reportOperations.fetchLastMonthsReport(2));
        },
        onClearFilters: () => dispatch(operations.clearFilters()),
        onSubmit: (transaction, type) => dispatch(operations.saveTransaction(transaction, type)),
        onDelete: (id, type) => dispatch(operations.deleteTransaction(id, type)),
        onEdit: (id) => dispatch(operations.editTransaction(id)),
        onCopy: (id) => dispatch(operations.copyTransaction(id)),
        onPay: (id, revert) => dispatch(operations.payTransactions(id, revert)),
        onFinishEdit: () => {
            dispatch(operations.finishEditTransaction());
            dispatch(categoryOperations.finishEditCategory());
        }
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);