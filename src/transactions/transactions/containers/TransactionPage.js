import React from 'react';
import { connect } from 'react-redux';

import {    
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Modal,
  Panel,
  PanelContainer,  
  Checkbox,
  Table,
  ButtonGroup,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import { EXPENSE, INCOME, ALL } from '../../kinds';
import TransactionTableContainer from './TransactionTableContainer';
import TransactionFormModal from './TransactionFormModal';
import TransactionFilter from './../components/TransactionFilter';
import * as saveOptions from './../components/TransactionForm';
import ConfirmDeleteDialog from './../components/ConfirmDeleteDialog';
import { operations, types, selectors } from '../duck';
import { operations as categoryOperations, selectors as categorySelectors } from '../../categories/duck';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FloatingActionButton from 'FloatingActionButton';

class TransactionPage extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            showTransactionFormModal: false,
            showTransactionDeleteModal: false,
            showFilterForm: false
        };        

        //Fetch
        this.handleRefresh = this.handleRefresh.bind(this);

        //Filter
        this.handleShowFilter = this.handleShowFilter.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

        //Create/Edit Modal
        this.handleCopy = this.handleCopy.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreateTransaction = this.handleCreateTransaction.bind(this);
        this.handleHideTransactionFormModal = this.handleHideTransactionFormModal.bind(this);
        this.handleTransactionFormSubmit = this.handleTransactionFormSubmit.bind(this);        

        //Delete Modal
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    }

    componentDidMount() {
        this.props.fetch(ALL);
    }    

    handleRefresh() {
        this.props.fetch(ALL);
    }

    handleCreateTransaction() {
        this.setState({ showTransactionFormModal: true });
    }    

    handleHideTransactionFormModal() {
        this.props.onFinishEdit();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit(type, option, transaction) {
        const kind = EXPENSE;//TODO: GET IT RIGHT
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

    handleCopy(id) {
        this.setState({ showTransactionFormModal: true });
        this.props.onCopy(id);        
    }

    handleEdit(id) {
        this.setState({ showTransactionFormModal: true });
        this.props.onEdit(id);        
    }

    handleDelete(id) {
        const toDeletePeriodicTransaction = this.props.transactions.find(transaction => transaction.id == id).periodic_transaction;
        this.setState({ 
            showTransactionDeleteModal: true,
            toDeleteId: id,
            toDeletePeriodicTransaction 
        });
    }

    handleConfirmDelete(type) {
        const kind = this.props.transactions.find(transaction => transaction.id == id).expense;
        const id = (type == types.DELETE_ALL_PERIODIC_TRANSACTIONS) ? this.state.toDeletePeriodicTransaction : this.state.toDeleteId;
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

    handleHideDeleteModal() {
        this.props.onFinishEdit();
        this.setState({ 
            showTransactionDeleteModal: false, 
            toDeleteId: undefined,
            toDeletePeriodicTransaction: undefined
        });
    }

    handleShowFilter() {
        this.setState({ showFilterForm: !this.state.showFilterForm });
    }

    handleFilter(filters) {
        if (filters) {
            this.props.filter(filters)
                .then(actionResult => actionResult.transactions)
                .then(filteredTransactions => {
                    this.setState({ 
                        filteredTransactions: filteredTransactions.map(transaction => transaction.id) 
                    });
                });
            }
        else {
            this.setState({ filteredTransactions: undefined });
        }
    }

    render() {
        const { isFetching } = this.props;
        const { kind } = EXPENSE;
        const { filteredTransactions } = this.state;
        const transactions = filteredTransactions ? 
            this.props.transactions.filter(transaction => filteredTransactions.includes(transaction.id)) : 
            this.props.transactions; //.filter(transaction => transaction.kind === kind.id);
        const categories = this.props.categories;//.filter(category => category.kind === kind.id);
        
        return (
            <div className="transaction-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionTableContainer
                                            transactions={transactions} 
                                            categories={categories}
                                            isFetching={isFetching}
                                            onFilter={this.handleShowFilter}
                                            onRefresh={this.handleRefresh}
                                            onEdit={this.handleEdit}
                                            onDelete={this.handleDelete}
                                            onCopy={this.handleCopy}>

                                            {this.state.showFilterForm && 
                                                <TransactionFilter
                                                    onFilter={this.handleFilter} 
                                                    isFetching={isFetching}
                                                    transactions={transactions} />}

                                        </TransactionTableContainer>
                                    </Col>

                                </Row>
                                
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <TransactionFormModal
                    show={this.state.showTransactionFormModal}
                    onHide={this.handleHideTransactionFormModal}
                    title={this.props.editingTransaction.id ? `Editar ${EXPENSE.text}` : `Criar ${EXPENSE.text}`}
                    kind={EXPENSE}

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
                </FloatingActionButton>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.transactions,
        categories: categorySelectors.getCategories(state),
        errors: {
            ...selectors.getErrors(state),
            category: categorySelectors.getNameError(state)
        },
    }
};

const mapDispatchToProps = (dispatch) => {
    const { fetchTransactions, deleteTransaction, copyTransaction, saveTransaction, editTransaction, finishEditTransaction, filterTransactions } = operations;
    const { finishEditCategory, fetchCategories, fetchAllCategories } = categoryOperations;
    return {
        fetch: () => {
            dispatch(fetchCategories(INCOME));
            dispatch(fetchCategories(EXPENSE));
            dispatch(fetchTransactions(ALL));            
        },
        filter: (kind, filters) => {
            return dispatch(filterTransactions(kind, filters));
        },
        onSubmit: (transaction, kind, type) => dispatch(saveTransaction(transaction, kind, type)),
        onDelete: (id, kind, type) => dispatch(deleteTransaction(id, kind, type)),
        onEdit: (id) => dispatch(editTransaction(id)),
        onCopy: (id) => dispatch(copyTransaction(id)),
        onFinishEdit: () => {
            dispatch(finishEditTransaction()),
            dispatch(finishEditCategory())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);