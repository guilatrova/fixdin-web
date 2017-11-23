/* eslint-disable no-fallthrough */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';

import { formatCurrencyDisplay } from '../../../services/formatter';
import TransactionTable from '../components/TransactionTable';
// import TransactionFormModal from './TransactionFormModal';
// import TransactionFilter from './../components/TransactionFilter';
import * as saveOptions from './../components/TransactionForm';
// import ConfirmDeleteDialog from './../components/ConfirmDeleteDialog';
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
        onFilter: PropTypes.func.isRequired,
        onClearFilters: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCopy: PropTypes.func.isRequired,
        onFinishEdit: PropTypes.func.isRequired,
    }

    state = {
        showTransactionFormModal: false,
        showTransactionDeleteModal: false,
        showFilterForm: false
    }

    componentDidMount() {
        this.props.onFetch();
    }    

    handleRefresh = () => {
        this.props.onFetch();
    }

    handleCreateTransaction = () => {
        this.setState({ showTransactionFormModal: true });
    }    

    handleHideTransactionFormModal = () => {
        this.props.onFinishEdit();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit = (type, option, transaction, kind) => {
        this.props.onSubmit(transaction, kind, type).then(({result}) => {
            if (result == 'success') {

                switch(option) {
                    case saveOptions.CLOSE:
                        this.setState({ showTransactionFormModal: false });

                    default:
                        this.props.onFinishEdit();
                        break;
                }
            }
        });
    }

    handleCopy = id => {
        this.setState({ showTransactionFormModal: true });
        this.props.onCopy(id);        
    }

    handleEdit = id => {
        this.setState({ showTransactionFormModal: true });
        this.props.onEdit(id);        
    }

    handlePay = id => {
        const kindId = this.props.transactions.find(transaction => transaction.id == id).kind;        
        this.props.onPay(getKind(kindId), id);
    }

    handleDelete = id => {
        const toDeletePeriodicTransaction = this.props.transactions.find(transaction => transaction.id == id).periodic_transaction;
        this.setState({ 
            showTransactionDeleteModal: true,
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
                    showTransactionDeleteModal: false, 
                    toDeleteId: undefined,
                    toDeletePeriodicTransaction: undefined
                });
            }
        });
    }

    handleHideDeleteModal = () => {
        this.props.onFinishEdit();
        this.setState({ 
            showTransactionDeleteModal: false, 
            toDeleteId: undefined,
            toDeletePeriodicTransaction: undefined
        });
    }

    handleShowFilter = () => {
        this.setState({ showFilterForm: !this.state.showFilterForm });
    }

    handleFilter = filters => {
        if (filters) {
            this.props.onFilter(filters);
        }
        else {
            this.props.onClearFilters();
        }
    }

    render() {
        const { isFetching, transactions, categories, classes, totalIncomes, totalExpenses, total } = this.props;        
        
        return (
            <div className={classes.root}>
                <Paper>
                    
                    <Toolbar className>
                        <div className={classes.title}>
                            <Typography type="title">Movimentações | Receitas: {`R$ ${totalIncomes}`} | Despesas: {`R$ ${totalExpenses}`} | Total: {`R$ ${total}`}</Typography>
                        </div>
                        <div className={classes.spacer} />
                        <div className={classes.actions}>
                            <IconButton aria-label="Refresh" onClick={this.handleRefresh} disabled={isFetching}><RefreshIcon /></IconButton>
                            <IconButton aria-label="Filter list" onClick={this.handleFilter}><FilterListIcon /></IconButton>
                        </div>
                    </Toolbar>

                    <div className={classes.table}>

                        <TransactionTable
                            transactions={transactions} 
                            categories={categories}
                            isFetching={isFetching}
                            onFilter={this.handleShowFilter}
                            onRefresh={this.handleRefresh}
                            onEdit={this.handleEdit}
                            onPay={this.handlePay}
                            onDelete={this.handleDelete}
                            onCopy={this.handleCopy} />
                    </div>
                </Paper>            

                {/* <TransactionFormModal
                    show={this.state.showTransactionFormModal}
                    onHide={this.handleHideTransactionFormModal}
                    title={this.props.editingTransaction.id ? `Editar` : `Criar`}

                    onSubmit={this.handleTransactionFormSubmit}
                    isFetching={isFetching}
                    errors={this.props.errors}
                    transaction={Object.keys(this.props.editingTransaction).length > 0 ? this.props.editingTransaction : undefined} />

                <ConfirmDeleteDialog
                    open={this.state.showTransactionDeleteModal} 
                    onRequestClose={this.handleHideDeleteModal}
                    onConfirm={this.handleConfirmDelete}
                    isPeriodic={this.state.toDeletePeriodicTransaction}
                    error={this.props.errors['detail']}>

                    Tem certeza que deseja deletar esta movimentação?
                </ConfirmDeleteDialog>

                <FloatingActionButton color="primary" onClick={this.handleCreateTransaction}>                
                    <AddIcon />
                </FloatingActionButton> */}

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
        onFetch: () => {
            dispatch(categoryOperations.fetchCategories(INCOME));
            dispatch(categoryOperations.fetchCategories(EXPENSE));
            dispatch(operations.fetchTransactions(ALL));
        },
        onFilter: (filters) => dispatch(operations.filterTransactions(filters)),
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