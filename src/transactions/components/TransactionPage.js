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
import { fetchTransactions, createTransaction } from '../actions';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateNewModal: false,
        };

        this.handleCreateTransactionClick = this.handleCreateTransactionClick.bind(this);
        this.handleHideCreateModalClick = this.handleHideCreateModalClick.bind(this);
    }

    componentDidMount() {
        this.props.fetch();
    }

    handleCreateTransactionClick() {
        this.setState({ showCreateNewModal: true });
    }

    handleHideCreateModalClick() {
        this.setState({ showCreateNewModal: false });
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
                                        <Button bsStyle='primary' onClick={this.handleCreateTransactionClick}>Criar</Button>
                                    </Col>
                                </Row>
                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionList kind={'income'} transactions={this.props.transactions} isFetching={this.props.isFetching}/>
                                    </Col>

                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <Modal show={this.state.showCreateNewModal} onHide={this.handleHideCreateModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>Criar receita</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TransactionForm onSubmit={this.props.onCreateFormSubmit} isFetching={this.props.isFetching} kind='income' />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const { transactions, isFetching } = state.transactions;    
    return {
        transactions,
        isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => dispatch(fetchTransactions()),
        onCreateFormSubmit: (transaction) => dispatch(createTransaction(transaction))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);