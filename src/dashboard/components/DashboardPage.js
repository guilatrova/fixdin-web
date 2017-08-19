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

import BalanceCard from './../../balances/components/BalanceCard';
import { operations } from './../../balances/duck';
import Chart from './../../reports/components/Last13MonthsChart';
import { formatCurrencyDisplay } from '../../services/formatter';

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchBalance();
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const balanceState = state.balances;
    return {
        balance: balanceState.balance,
        realBalance: balanceState.realBalance
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBalance: () => {
            dispatch(operations.fetchBalance());
            dispatch(operations.fetchRealBalance());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);