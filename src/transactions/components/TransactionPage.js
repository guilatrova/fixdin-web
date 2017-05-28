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

import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ConfirmDeleteTransactionModal from './ConfirmDeleteTransactionModal';
import { fetchTransactions, saveTransaction, editTransaction, deleteTransaction, finishEditTransaction } from '../actions';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTransactionFormModal: false,
            showTransactionDeleteModal: false
        };

        this.handleCreateTransactionClick = this.handleCreateTransactionClick.bind(this);
        this.handleHideCreateModalClick = this.handleHideCreateModalClick.bind(this);
        this.handleEditTransaction = this.handleEditTransaction.bind(this);
        this.handleTransactionFormSubmit = this.handleTransactionFormSubmit.bind(this);

        //Delete
        this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
        this.handleConfirmDeleteTransaction = this.handleConfirmDeleteTransaction.bind(this);
        this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    }

    componentDidMount() {
        this.props.fetch();
    }

    handleCreateTransactionClick() {
        this.setState({ showTransactionFormModal: true });
    }

    handleHideCreateModalClick() {
        this.props.finishEditTransaction();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit(transaction) {        
        this.props.onTransactionFormSubmit(transaction);
        this.props.finishEditTransaction();
        this.setState({ showTransactionFormModal: false });
    }

    handleEditTransaction(id) {
        this.setState({ showTransactionFormModal: true });
        this.props.editTransaction(id);        
    }

    handleDeleteTransaction(id) {
        this.setState({ 
            showTransactionDeleteModal: true,
            toDeleteId: id 
        });
    }

    handleConfirmDeleteTransaction() {
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
                                        <Button bsStyle='primary' onClick={this.handleCreateTransactionClick}>Nova</Button>
                                    </Col>
                                </Row>
                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionList kind='income' 
                                            transactions={this.props.transactions} 
                                            isFetching={this.props.isFetching}
                                            onEdit={this.handleEditTransaction}
                                            onDelete={this.handleDeleteTransaction}
                                            />
                                    </Col>

                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <Modal show={this.state.showTransactionFormModal} onHide={this.handleHideCreateModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.editingTransaction.id ? 'Editar receita' : 'Criar receita'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TransactionForm 
                            onSubmit={this.handleTransactionFormSubmit} 
                            isFetching={this.props.isFetching} 
                            transaction={this.props.editingTransaction}
                            kind='income' />
                    </Modal.Body>
                </Modal>

                <ConfirmDeleteTransactionModal 
                    show={this.state.showTransactionDeleteModal} 
                    onHide={this.handleHideDeleteModal} 
                    onConfirmDelete={this.handleConfirmDeleteTransaction} />

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