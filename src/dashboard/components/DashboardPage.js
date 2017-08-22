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

import { operations as balanceOperations, selectors as balanceSelectors } from './../../balances/duck';
import { operations as reportOperations, selectors as reportSelectors } from './../../reports/duck';
import { EXPENSE, INCOME } from './../../transactions/kinds';

import BalanceCard from './../../balances/components/BalanceCard';
import Chart from './../../reports/components/Last13MonthsChart';
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

                <Chart />

                <PanelContainer>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <TransactionList transactions={this.props.overdueExpenses} />
                                    </Col>

                                    <Col xs={12} md={6}>
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
        overdueExpenses: reportSelectors.getOverdueExpenses(state)
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);