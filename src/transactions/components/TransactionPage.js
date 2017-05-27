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
import { fetchTransactions, saveTransaction, editTransaction, finishEditTransaction } from '../actions';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTransactionModal: false,
        };

        this.handleCreateTransactionClick = this.handleCreateTransactionClick.bind(this);
        this.handleHideCreateModalClick = this.handleHideCreateModalClick.bind(this);
        this.handleEditTransaction = this.handleEditTransaction.bind(this);
    }

    componentDidMount() {
        this.props.fetch();
    }

    handleCreateTransactionClick() {
        this.setState({ showTransactionModal: true });
    }

    handleHideCreateModalClick() {
        this.props.finishEditTransaction();
        this.setState({ showTransactionModal: false });
    }

    handleEditTransaction(id) {
        this.setState({ showTransactionModal: true });
        this.props.editTransaction(id);
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
                                            />
                                    </Col>

                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <Modal show={this.state.showTransactionModal} onHide={this.handleHideCreateModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.editingTransaction.id ? 'Editar receita' : 'Criar receita'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TransactionForm 
                            onSubmit={this.props.onTransactionFormSubmit} 
                            isFetching={this.props.isFetching} 
                            transaction={this.props.editingTransaction}
                            kind='income' />
                    </Modal.Body>
                </Modal>
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
        editTransaction: (id) => dispatch(editTransaction(id)),
        finishEditTransaction: () => dispatch(finishEditTransaction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);