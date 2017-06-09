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

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...this.props.transaction,            
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
        this.props.onSubmit(this.state);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDueDateChange(value) {
        this.setState({ due_date: value });
    }

    handleValueChange(value) {
        this.setState({ value: value });
    }

    togglePeriodic(e) {
        this.setState({ periodic_visible: !this.state.periodic_visible});
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
                    onChange={this.handleDueDateChange}
                    value={this.state.due_date} />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError
                id="description"
                label="Descrição"
                error={errors.description}
                value={this.state.description}
                onChange={this.handleChange} />

            <HorizontalFormGroupError
                id="category"
                label="Categoria"
                error={errors.category}
                value={this.state.category}
                onChange={this.handleChange} />

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
                id="importance"
                label="Prioridade"
                error={errors.importance}
                value={this.state.importance}
                onChange={this.handleChange} />

            <HorizontalFormGroupError id="details" label="Detalhes" error={errors.details}>
                <FormControl
                    className='border-focus-blue'
                    componentClass='textarea'
                    name="details"
                    onChange={this.handleChange}
                    value={this.state.details} />
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
    transaction: PropTypes.object.isRequired
}

TransactionForm.defaultProps = {
    errors: { },
    transaction: {
        account: 0,
        due_date: moment(new Date()),
        description: '',
        category: '',
        value: '0,00',
        details: '',
    }
}

export default TransactionForm;