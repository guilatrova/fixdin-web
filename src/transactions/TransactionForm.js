import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

import {    
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Checkbox,
  Button,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import { sendTransactionRequest } from './transactionActions';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 0,
            due_date: moment(new Date()),
            description: '',
            category: '',
            value: '0,00',
            kind: props.kind,
            details: '',
            periodic: {},
            errors: {},
            periodic_visible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePeriodic = this.togglePeriodic.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        sendTransactionRequest(this.state)
        .then(
            ({ data }) => {console.log(data)}
        )
        .catch(
            (error) => {console.error(error)}
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDueDateChange(value) {
        // if (value instanceof moment)
        this.setState({ due_date: value });
    }

    handleValueChange(value) {
        this.setState({ value: value });
    }

    togglePeriodic(e) {
        this.setState({ periodic_visible: !this.state.periodic_visible});
    }
    
    render() {
        return (
        <Form horizontal onSubmit={this.handleSubmit}>
            
            <FormGroup controlId='dueDateGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Vencimento
                </Col>
                <Col sm={10}>
                    <DatetimeInput
                        timeFormat={false}
                        className='border-focus-blue'
                        onChange={this.handleDueDateChange}                        
                        value={this.state.due_date} />                    
                </Col>
            </FormGroup>

            <FormGroup controlId='descriptionGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Descrição
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description} />
                </Col>
            </FormGroup>

            <FormGroup controlId='categoryGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Categoria
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category} />
                </Col>
            </FormGroup>

            <FormGroup controlId='valueGroup'>

                <Col componentClass={ControlLabel} sm={2}>
                    Valor
                </Col>

                <Col sm={10}>
                    <CurrencyInput 
                        className='border-focus-blue form-control'
                        onChange={this.handleValueChange}
                        value={this.state.value}
                        prefix="R$ "
                        decimalSeparator=","
                        thousandSeparator="." />
                </Col>

            </FormGroup>

            <FormGroup controlId='detailsGroup'>

                <Col componentClass={ControlLabel} sm={2}>
                    Detalhes
                </Col>

                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        componentClass='textarea'
                        name="details"
                        onChange={this.handleChange}
                        value={this.state.details} />
                </Col>

            </FormGroup>

            <FormGroup controlId='periodicCheckGroup'>
                <Col smOffset={2} sm={10}>
                    <Checkbox onChange={this.togglePeriodic} checked={this.state.periodic_visible}>
                        Periódico
                    </Checkbox>
                </Col>
            </FormGroup>

            <FormGroup controlId='periodicGroup'>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10} className='text-right'>
                    <Button lg type='submit' bsStyle='primary'>Criar</Button>
                </Col>
            </FormGroup>

            </Form>
        );
    }
}

export default TransactionForm;