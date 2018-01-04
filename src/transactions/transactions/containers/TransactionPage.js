/* eslint-disable no-fallthrough */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import ClearAllIcon from 'material-ui-icons/ClearAll';
import RefreshIcon from 'material-ui-icons/Refresh';

import { formatCurrencyDisplay } from '../../../services/formatter';
import TransactionTable from '../components/TransactionTable';
import TransactionFormDialog from './TransactionFormDialog';
import * as saveOptions from './../components/TransactionForm';
import ConfirmDeleteDialog from './../components/ConfirmDeleteDialog';
import { operations, types, selectors } from '../duck';
import { operations as categoryOperations, selectors as categorySelectors } from '../../categories/duck';
import FloatingActionButton from '../../../common/material/FloatingActionButton';
import { EXPENSE, INCOME, ALL, getKind } from '../../kinds';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
      overflowX: 'auto',
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
        transactions: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        editingTransaction: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        errors: PropTypes.object,
        classes: PropTypes.object,
        total: PropTypes.string.isRequired,
        totalIncomes: PropTypes.string.isRequired,
        totalExpenses: PropTypes.string.isRequired,

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

    handleRefresh = () => {
        this.props.onFetch(0);
    }

    handleCreateTransaction = () => {
        this.setState({ openTransactionFormDialog: true });
    }    

    handleHideTransactionFormModal = () => {
        this.props.onFinishEdit();
        this.setState({ openTransactionFormDialog: false });
    }

    handleTransactionFormSubmit = (type, option, transaction, kind) => {
        this.props.onSubmit(transaction, kind, type).then(({result}) => {
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
        const kindId = this.props.transactions.find(transaction => transaction.id == id).kind;        
        this.props.onPay(getKind(kindId), id);
    }

    handleDelete = id => {
        const toDeletePeriodicTransaction = this.props.transactions.find(transaction => transaction.id == id).periodic_transaction;
        this.setState({ 
            openDeleteDialog: true,
            toDeleteId: id,
            toDeletePeriodicTransaction 
        });
    }

    handleConfirmDelete = type => {
        const id = (type == types.DELETE_ALL_PERIODIC_TRANSACTIONS) ? this.state.toDeletePeriodicTransaction : this.state.toDeleteId;
        const kind = getKind(this.props.transactions.find(transaction => transaction.id == id).kind);

        this.props.onDelete(id, kind, type).then(({result}) => {
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
        const { isFetching, transactions, categories, classes, totalIncomes, totalExpenses, total } = this.props;        
        
        return (
            <div className={classes.root}>
                <Paper>
                    
                    <Toolbar>
                        <div className={classes.title}>
                            <Typography type="title">Movimentações | Receitas: {`R$ ${totalIncomes}`} | Despesas: {`R$ ${totalExpenses}`} | Total: {`R$ ${total}`}</Typography>
                        </div>
                        <div className={classes.spacer} />
                        <div className={classes.actions}>
                            <IconButton aria-label="Refresh" onClick={this.handleRefresh} disabled={isFetching}><RefreshIcon /></IconButton>
                            <IconButton aria-label="Filter list" onClick={this.handleClearFilters}><ClearAllIcon /></IconButton>
                        </div>
                    </Toolbar>

                    <div className={classes.table}>

                        <TransactionTable
                            transactions={transactions} 
                            categories={categories}
                            isFetching={isFetching}
                            onRefresh={this.handleRefresh}
                            onEdit={this.handleEdit}
                            onPay={this.handlePay}
                            onDelete={this.handleDelete}
                            onCopy={this.handleCopy} />
                    </div>

                    <FloatingActionButton color="primary" onClick={this.handleCreateTransaction}>
                        <AddIcon />
                    </FloatingActionButton>
                </Paper>            

                <TransactionFormDialog
                    open={this.state.openTransactionFormDialog}
                    onRequestClose={this.handleHideTransactionFormModal}
                    title={this.props.editingTransaction.id ? `Editar` : `Criar`}

                    onSubmit={this.handleTransactionFormSubmit}
                    isFetching={isFetching}
                    errors={this.props.errors}
                    transaction={Object.keys(this.props.editingTransaction).length > 0 ? this.props.editingTransaction : undefined} />

                <ConfirmDeleteDialog
                    open={this.state.openDeleteDialog} 
                    onRequestClose={this.handleHideDeleteModal}
                    onConfirm={this.handleConfirmDelete}
                    isPeriodic={this.state.toDeletePeriodicTransaction}
                    error={this.props.errors['detail']}>

                    Tem certeza que deseja deletar esta movimentação?
                </ConfirmDeleteDialog>

                

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        total: formatCurrencyDisplay(selectors.getTotalValueOfDisplayedTransactions(state)),
        totalExpenses: formatCurrencyDisplay(selectors.getTotalValueOfDisplayedExpenses(state)),
        totalIncomes: formatCurrencyDisplay(selectors.getTotalValueOfDisplayedIncomes(state)),
        transactions: selectors.getTransactionsToDisplay(state),
        categories: categorySelectors.getCategories(state),
        editingTransaction: selectors.getEditingTransaction(state),
        isFetching: selectors.isFetching(state),
        errors: {
            ...selectors.getErrors(state),
            category: categorySelectors.getNameError(state)
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (timeout = 5) => {
            dispatch(categoryOperations.fetchCategories(INCOME));
            dispatch(categoryOperations.fetchCategories(EXPENSE));
            dispatch(operations.fetchTransactions(ALL, timeout));
        },        
        onClearFilters: () => dispatch(operations.clearFilters()),
        onSubmit: (transaction, kind, type) => dispatch(operations.saveTransaction(transaction, kind, type)),
        onDelete: (id, kind, type) => dispatch(operations.deleteTransaction(id, kind, type)),
        onEdit: (id) => dispatch(operations.editTransaction(id)),
        onCopy: (id) => dispatch(operations.copyTransaction(id)),
        onPay: (kind, id) => dispatch(operations.payTransactions(kind, id)),
        onFinishEdit: () => {
            dispatch(operations.finishEditTransaction());
            dispatch(categoryOperations.finishEditCategory());
        }
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);