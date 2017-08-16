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

import BalanceCard from './BalanceCard';
import { operations } from './../ducks';

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.fetchBalance();
    }

    render() {
        return (
            <div className="dashboard-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <BalanceCard title="Saldo">
                                            {this.props.balance}
                                        </BalanceCard>                                    
                                    </Col>
                                    
                                    <Col xs={6} md={3}>
                                        <BalanceCard title="Saldo">
                                            {this.props.balance}
                                        </BalanceCard>                                    
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
    const balanceState = state.balances;
    return {
        balance: balanceState.balance
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBalance: () => dispatch(operations.fetchBalance())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);