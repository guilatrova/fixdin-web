import React from 'react';
import PropTypes from 'prop-types';
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
import Typography from 'material-ui/Typography';

import { operations as balanceOperations, selectors as balanceSelectors } from './../../balances/duck';
import { operations as reportOperations, selectors as reportSelectors } from './../../reports/duck';
import { EXPENSE, INCOME } from './../../transactions/kinds';

import BalanceCard from './../../balances/components/BalanceCard';
import Last13MonthsChart from './../../reports/components/Last13MonthsChart';
import ValuesByCategoryPieChartContainer from './../../reports/components/ValuesByCategoryPieChartContainer';
import TransactionList from './../../transactions/transactions/components/TransactionList';
import { formatCurrencyDisplay } from '../../services/formatter';

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchBalance();
        this.props.fetchPendingTransactions();
    }

    render() {
        const balance = formatCurrencyDisplay(this.props.balance);
        const realBalance = formatCurrencyDisplay(this.props.realBalance);

        return (
            <div className="dashboard-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <BalanceCard title="Saldo">
                                            {balance}
                                        </BalanceCard>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <BalanceCard title="Saldo real">
                                            {realBalance}
                                        </BalanceCard>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <ValuesByCategoryPieChartContainer />

                <Last13MonthsChart />

                <PanelContainer>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <Typography type="title">Próximas despesas</Typography>
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Typography type="subheading">Despesas vencidas</Typography>
                                        <TransactionList transactions={this.props.overdueExpenses} />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Typography type="subheading">Despesas pendentes</Typography>
                                        <TransactionList transactions={this.props.nextPendingExpenses} />
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <PanelContainer>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <Typography type="title">Próximas receitas</Typography>
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Typography type="subheading">Receitas vencidas</Typography>
                                        <TransactionList transactions={this.props.overdueIncomes} />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Typography type="subheading">Receitas pendentes</Typography>
                                        <TransactionList transactions={this.props.nextPendingIncomes} />
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balance: balanceSelectors.getBalance(state),
        realBalance: balanceSelectors.getRealBalance(state),
        nextPendingExpenses: reportSelectors.getNextPendingExpenses(state),
        overdueExpenses: reportSelectors.getOverdueExpenses(state),
        nextPendingIncomes: reportSelectors.getNextPendingIncomes(state),
        overdueIncomes: reportSelectors.getOverdueIncomes(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBalance: () => {
            dispatch(balanceOperations.fetchBalance());
            dispatch(balanceOperations.fetchRealBalance());
        },
        fetchPendingTransactions: () => {
            dispatch(reportOperations.fetchPendingTransactionsReport(EXPENSE));
            dispatch(reportOperations.fetchPendingTransactionsReport(INCOME));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);