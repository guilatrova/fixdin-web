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
  Button,
  ButtonGroup,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import { EXPENSE } from '../../kinds';
import TransactionList from './TransactionList';
import TransactionFormModal from './TransactionFormModal';
import ConfirmDeleteModal from './../../../common/components/modals/ConfirmDeleteModal';
import { 
    fetchTransactions,    
    saveTransaction, 
    editTransaction, 
    deleteTransaction, 
    finishEditTransaction 
} from '../actions';

import {
    fetchCategories
} from '../../categories/actions';

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
        this.props.onFinishEdit();
        this.setState({ showTransactionFormModal: false });
    }

    handleTransactionFormSubmit(transaction) {
        const { kind } = this.props.route;
        this.props.onSubmit(transaction, kind).then(({result}) => {
            if (result == 'success') {
                this.props.onFinishEdit();
                this.setState({ showTransactionFormModal: false });
            }
        });
    }

    handleEdit(id) {
        this.setState({ showTransactionFormModal: true });
        this.props.onEdit(id);        
    }

    handleDelete(id) {
        this.setState({ 
            showTransactionDeleteModal: true,
            toDeleteId: id 
        });
    }

    handleConfirmDelete() {
        const { kind } = this.props.route;        
        this.props.onDelete(this.state.toDeleteId, kind).then(({result}) => {
            if (result == 'success') {
                this.setState({ 
                    showTransactionDeleteModal: false, 
                    toDeleteId: undefined 
                });
            }
        });
    }

    handleHideDeleteModal() {
        this.props.onFinishEdit();
        this.setState({ 
            showTransactionDeleteModal: false, 
            toDeleteId: undefined 
        });
    }

    render() {
        const { isFetching } = this.props;
        const { kind } = this.props.route;
        const transactions = this.props.transactions.filter(transaction => transaction.kind === kind.id);
        const categories = this.props.categories.filter(category => category.kind === kind.id);

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
                                        <TransactionList
                                            transactions={transactions} 
                                            categories={categories}
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
                    errors={this.props.errors}
                    transaction={this.props.editingTransaction} />

                <ConfirmDeleteModal 
                    show={this.state.showTransactionDeleteModal} 
                    onHide={this.handleHideDeleteModal}
                    error={this.props.errors['detail']}
                    onConfirmDelete={this.handleConfirmDelete} >

                    Tem certeza que deseja deletar esta {kind.text}?
                </ConfirmDeleteModal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.transactions,
        categories: state.categories.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (kind) => {
            dispatch(fetchCategories(kind));
            dispatch(fetchTransactions(kind));            
        },
        onSubmit: (transaction, kind) => dispatch(saveTransaction(transaction, kind)),
        onDelete: (id, kind) => dispatch(deleteTransaction(id, kind)),
        onEdit: (id) => dispatch(editTransaction(id)),
        onFinishEdit: () => dispatch(finishEditTransaction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);