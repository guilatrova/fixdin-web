import React, { PropTypes } from 'react';
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
  HelpBlock,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import HorizontalFormGroupError from './../../../common/components/forms/HorizontalFormGroupError';
import CategorySelectPicker from './../../categories/components/CategorySelectPicker';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...this.props.transaction,            
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleSubmit(e) {
        e.preventDefault();        
        this.props.onSubmit({
            ...this.state
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCategoryChange(value) {
        this.setState({ category: value });
    }

    handleDateChange(id, value) {
        this.setState({ [id]: value });
    }

    handleValueChange(value) {
        this.setState({ value });
    }

    isSubmitDisabled() {
        let disabled = false;
        if (this.props.isFetching) {
            disabled = true;
        }       
        else if (this.state.value == '' || this.state.value == undefined) { //0 is enabled
            disabled = true;
        }
        else if (!moment.isMoment(this.state.due_date)) {            
            disabled = true;            
        }
        else {
            disabled = !(this.state.due_date && this.state.category && this.state.description);
        }
        
        return disabled;
    }
    
    render() {
        const { errors } = this.props;
        const disabled = this.isSubmitDisabled();

        return (
        <Form horizontal onSubmit={this.handleSubmit}>
            
            <HorizontalFormGroupError id="due_date" label="Vencimento" error={errors.due_date} >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    onChange={(value) => this.handleDateChange('due_date', value)}
                    value={this.state.due_date}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError
                id="description"
                label="Descrição"
                error={errors.description}
                value={this.state.description}
                onChange={this.handleChange}
                maxLength="120" />

            <HorizontalFormGroupError id="category" label="Categoria" error={errors.category}>
                <CategorySelectPicker 
                    kind={this.props.kind} 
                    value={this.state.category}
                    onChange={this.handleCategoryChange} />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError id="value" label="Valor" error={errors.value}>
                <CurrencyInput 
                    className='border-focus-blue form-control'
                    onChange={this.handleValueChange}
                    value={this.state.value}
                    prefix="R$ "
                    decimalSeparator=","
                    thousandSeparator="." />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError
                id="deadline"
                label="Prazo"
                error={errors.deadline}
                value={this.state.deadline}
                onChange={this.handleChange} />

            <HorizontalFormGroupError
                id="priority"
                label="Prioridade"
                error={errors.priority}
                value={this.state.priority}
                onChange={this.handleChange} />

            <HorizontalFormGroupError id="payment_date" label="Pago em" error={errors.payment_date} >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    onChange={(value) => this.handleDateChange('payment_date', value)}
                    value={this.state.payment_date}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError id="details" label="Detalhes" error={errors.details}>
                <FormControl
                    className='border-focus-blue'
                    componentClass='textarea'
                    name="details"
                    onChange={this.handleChange}
                    value={this.state.details}
                    maxLength="500" />
            </HorizontalFormGroupError>

            <FormGroup>
                <Col smOffset={2} sm={10} className='text-right'>
                    <Button lg type='submit' bsStyle='primary' disabled={disabled}>Salvar</Button>
                </Col>
            </FormGroup>

            </Form>
        );
    }
}

TransactionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    transaction: PropTypes.object.isRequired,
    kind: PropTypes.object.isRequired
}

TransactionForm.defaultProps = {
    errors: { },
    transaction: {
        account: 0,
        due_date: moment(new Date()),
        description: '',
        value: '0,00',
        details: '',
    }
}

export default TransactionForm;