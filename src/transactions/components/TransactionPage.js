import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

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
  Button,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import TransactionList from './TransactionList';
import TransactionFormModal from './TransactionFormModal';
import ConfirmDeleteTransactionModal from './ConfirmDeleteTransactionModal';
import { 
    fetchTransactions, 
    saveTransaction, 
    editTransaction, 
    deleteTransaction, 
    finishEditTransaction 
} from '../actions';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTransactionFormModal: false,
            showTransactionDeleteModal: false
        };            

        //Form
        this.handleCreateTransaction = this.handleCreateTransaction.bind(this);
        this.handleHideTransactionFormModal = this.handleHideTransactionFormModal.bind(this);
        this.handleTransactionFormSubmit = this.handleTransactionFormSubmit.bind(this);        

        //Delete
        this.handleEdit = this.handleEdit.bind(this);

        //Confirm delete
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    }

    componentDidMount() {
        this.props.fetch();
    }

    handleCreateTransaction() {
        this.setState({ showTransactionFormModal: true });
    }

    handleHideTransactionFormModal() {
        this.props.finishEditTransaction();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit(transaction) {        
        this.props.onTransactionFormSubmit(transaction);
        this.props.finishEditTransaction();
        this.setState({ showTransactionFormModal: false });
    }

    handleEdit(id) {
        this.setState({ showTransactionFormModal: true });
        this.props.editTransaction(id);        
    }

    handleDelete(id) {
        this.setState({ 
            showTransactionDeleteModal: true,
            toDeleteId: id 
        });
    }

    handleConfirmDelete() {
        this.props.deleteTransaction(this.state.toDeleteId);
        this.setState({ 
            showTransactionDeleteModal: false, 
            toDeleteId: undefined 
        });
    }

    handleHideDeleteModal() {
        this.setState({ 
            showTransactionDeleteModal: false, 
            toDeleteId: undefined 
        });
    }

    render() {
        return (
            <div className="transaction-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={2}>
                                        <Button bsStyle='primary' onClick={this.handleCreateTransaction}>Nova</Button>
                                    </Col>
                                </Row>
                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionList kind='income' 
                                            transactions={this.props.transactions} 
                                            isFetching={this.props.isFetching}
                                            onEdit={this.handleEdit}
                                            onDelete={this.handleDelete}
                                            />
                                    </Col>

                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <TransactionFormModal
                    show={this.state.showTransactionFormModal}
                    onHide={this.handleHideTransactionFormModal}
                    title={this.props.editingTransaction.id ? 'Editar receita' : 'Criar receita'}
                    kind={'income'}

                    onSubmit={this.handleTransactionFormSubmit}
                    isFetching={this.props.isFetching}
                    transaction={this.props.editingTransaction} />

                <ConfirmDeleteTransactionModal 
                    show={this.state.showTransactionDeleteModal} 
                    onHide={this.handleHideDeleteModal} 
                    onConfirmDelete={this.handleConfirmDelete} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const { transactions, isFetching, editingTransaction } = state.transactions;    
    return {
        transactions,
        editingTransaction,
        isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => dispatch(fetchTransactions()),
        onTransactionFormSubmit: (transaction) => dispatch(saveTransaction(transaction)),
        deleteTransaction: (id) => dispatch(deleteTransaction(id)),
        editTransaction: (id) => dispatch(editTransaction(id)),        
        finishEditTransaction: () => dispatch(finishEditTransaction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);