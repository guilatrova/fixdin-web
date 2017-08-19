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
import Typography from 'material-ui/Typography';

import { EXPENSE, INCOME, ALL } from '../../kinds';
import TransactionTableContainer from './TransactionTableContainer';
import TransactionFormModal from './TransactionFormModal';
import TransactionFilter from './TransactionFilter';
import * as saveOptions from './TransactionForm';
import ConfirmDeleteModal from 'ConfirmDeleteModal';
import { 
    fetchTransactions,
    saveTransaction, 
    editTransaction,
    copyTransaction,
    deleteTransaction, 
    finishEditTransaction 
} from '../duck/operations';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FloatingActionButton from 'FloatingActionButton';

import {
    fetchCategories,
    finishEditCategory
} from '../../categories/actions';

class TransactionPage extends React.Component {
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
    }

    componentDidMount() {
        this.props.fetch();
    }

    componentWillReceiveProps(nextProps) {
        //Necessary because DidMount isn't called again when we change between Incomes and Expenses
        if (this.props.route.kind != nextProps.route.kind) {
            this.props.fetch();
            this.handleFilter(undefined); //Remove filters
        }
    }

    handleRefresh() {
        this.props.fetch();
    }

    handleShowFilter() {
        this.setState({ showFilterForm: !this.state.showFilterForm });
    }

    handleFilter(filters) {
        const { kind, ...otherFilters } = filters;
        
        if (filters) {
            this.props.filter(kind, otherFilters)
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

    renderHeader(total, totalIncomes, totalExpenses) {
        return (
            <Typography type="title">Movimentações | Receitas: {`R$ ${totalIncomes}`} | Despesas: {`R$ ${totalExpenses}`} | Total: {`R$ ${total}`}</Typography>
        );
    }

    render() {
        const { isFetching, categories } = this.props;
        const { filteredTransactions } = this.state;
        const transactions = filteredTransactions ? 
            this.props.transactions.filter(transaction => filteredTransactions.includes(transaction.id)) : 
            this.props.transactions;

        return (
            <div className="transaction-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>                                
                                <Row>

                                    <Col xs={12}>
                                        <TransactionTableContainer
                                            renderHeader={this.renderHeader}
                                            transactions={transactions} 
                                            categories={categories}
                                            isFetching={isFetching}
                                            onFilter={this.handleShowFilter}
                                            onRefresh={this.handleRefresh}
                                            displayKind={true} >

                                            {this.state.showFilterForm && 
                                                <TransactionFilter 
                                                    kind={ALL} 
                                                    onFilter={this.handleFilter} 
                                                    isFetching={isFetching} 
                                                    transactions={transactions}
                                                    />
                                                }

                                        </TransactionTableContainer>
                                    </Col>

                                </Row>
                                
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const categoriesState = state.categories;
    const transactionsState = state.transactions;

    return {
        ...transactionsState,
        errors: {
            ...transactionsState.errors,
            category: categoriesState.errors.name
        },
        categories: categoriesState.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    const { fetchTransactions } = operations;
    return {
        fetch: () => {
            dispatch(fetchCategories(EXPENSE));
            dispatch(fetchCategories(INCOME));
            dispatch(fetchTransactions(ALL));            
        },
        filter: (kind, filters) => {
            kind = kind || ALL;
            return dispatch(fetchTransactions(kind, filters));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);