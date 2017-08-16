import React from 'react';
import PropTypes from 'prop-types';

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

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="dashboard-page">
                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs="6" md="3">
                                        <BalanceCard title="Fake balance">
                                            R$ 1000,00
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

export default DashboardPage;