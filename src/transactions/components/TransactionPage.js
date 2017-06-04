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
  ButtonGroup,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import { EXPENSE } from '../kinds';
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

        //Fetch
        this.handleRefresh = this.handleRefresh.bind(this);

        //Create/Edit Modal
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
        this.props.fetch(this.props.route.kind);
    }

    componentWillReceiveProps(nextProps) {
        //Necessary because DidMount isn't called again when we change between Incomes and Expenses
        if (this.props.route.kind != nextProps.route.kind) {
            this.props.fetch(nextProps.route.kind);
        }
    }

    handleRefresh() {
        this.props.fetch(this.props.route.kind);
    }

    handleCreateTransaction() {
        this.setState({ showTransactionFormModal: true });
    }    

    handleHideTransactionFormModal() {
        this.props.finishEditTransaction();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit(transaction) {
        const { kind } = this.props.route;
        this.props.onTransactionFormSubmit(transaction, kind);
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
        const { kind } = this.props.route;        
        this.props.deleteTransaction(this.state.toDeleteId, kind);
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
        const { isFetching } = this.props;
        const { kind } = this.props.route;
        const transactions = this.props.transactions.filter(transaction => transaction.kind === kind.id);

        return (
            <div className="transaction-page">
                <h1>{kind.text}</h1>
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <ButtonGroup>
                                            <Button bsStyle='primary' onClick={this.handleCreateTransaction}>Nova</Button>
                                            <Button bsStyle='blue' onClick={this.handleRefresh} disabled={isFetching}>Atualizar</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionList kind='income' 
                                            transactions={transactions} 
                                            isFetching={isFetching}
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
                    title={this.props.editingTransaction.id ? `Editar ${kind.text}` : `Criar ${kind.text}`}
                    kind={kind}

                    onSubmit={this.handleTransactionFormSubmit}
                    isFetching={isFetching}
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
        fetch: (kind) => dispatch(fetchTransactions(kind)),
        onTransactionFormSubmit: (transaction, kind) => dispatch(saveTransaction(transaction, kind)),
        deleteTransaction: (id, kind) => dispatch(deleteTransaction(id, kind)),
        editTransaction: (id) => dispatch(editTransaction(id)),        
        finishEditTransaction: () => dispatch(finishEditTransaction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);