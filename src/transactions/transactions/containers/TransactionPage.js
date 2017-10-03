import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

import { EXPENSE, INCOME, ALL, getKind } from '../../kinds';
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
        transactions: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        editingTransaction: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.object,

        onFetch: PropTypes.func.isRequired,
        onFilter: PropTypes.func.isRequired,
        onClearFilters: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCopy: PropTypes.func.isRequired,
        onFinishEdit: PropTypes.func.isRequired,
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
        this.props.onFetch();
    }    

    handleRefresh() {
        this.props.onFetch();
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
            this.props.onFilter(filters);
        }
        else {
            this.props.onClearFilters();
        }
    }

    render() {
        const { isFetching } = this.props;
        const { kind } = EXPENSE;
        const transactions = this.props.transactions;
        const categories = this.props.categories;
        
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
        transactions: selectors.getTransactionsToDisplay(state),
        categories: categorySelectors.getCategories(state),
        editingTransaction: selectors.getEditingTransaction(state),
        isFetching: selectors.isFetching(state),
        errors: {
            ...selectors.getErrors(state),
            category: categorySelectors.getNameError(state)
        },
    }
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
        onFinishEdit: () => {
            dispatch(operations.finishEditTransaction()),
            dispatch(categoryOperations.finishEditCategory())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);