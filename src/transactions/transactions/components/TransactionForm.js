import React from 'react';
import PropTypes from 'prop-types';
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
  SplitHoverButton,
  MenuItem as RbxMenuItem,
  HelpBlock,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl as RbxFormControl
} from '@sketchpixy/rubix';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import HorizontalFormGroupError from './../../../common/components/forms/HorizontalFormGroupError';
import CategorySelectPicker from './../../categories/components/CategorySelectPicker';
import TransactionDescription from './TransactionDescription';
import Periodic from './Periodic';

export const CLOSE = "CLOSE";
export const NEW = "NEW";
export const NEW_SAME_CATEGORY = "NEW_SAME_CATEGORY";

const emptyTransaction = {
    due_date: moment(new Date()),
    description: '',
    category: undefined,
    value: '0,00',
    deadline: undefined,
    priority: '',
    payment_date: undefined,
    details: '',
    periodic: {}
}

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...props.transaction,
            payed: !!props.transaction.payment_date,
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIsPeriodicChange = this.handleIsPeriodicChange.bind(this);
        this.handlePeriodicChange = this.handlePeriodicChange.bind(this);        
        this.handleOptionSelected = this.handleOptionSelected.bind(this);        
    }

    handleOptionSelected(key, e) {
        this.props.onSubmit(key, {...this.state});

        switch(key) {
            case NEW:
                this.setState({ ...emptyTransaction, errors: {} })
                break;

            case NEW_SAME_CATEGORY:
                this.setState({ ...emptyTransaction, errors: {}, category: this.state.category })
                break;
        }
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

    handlePayedChange(e, checked) {
        if (checked) {
            this.setState({
                payed: true,
                payment_date: moment(new Date())
            });
        }
        else {
            this.setState({
                payed: false,
                payment_date: null
            });
        }
    }    

    handleIsPeriodicChange(e, checked) {
        if (checked) {
            this.setState({ 
                periodic: {
                    period: "daily"
                } 
            });
        }
        else {
            this.setState({ periodic: null })
        }
        this.setState({ isPeriodic: checked });
    }

    handlePeriodicChange(periodic) {
        this.setState({ periodic });
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
        <Form horizontal>
            
            <HorizontalFormGroupError id="due_date" label="Vencimento" error={errors.due_date} >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    onChange={(value) => this.handleDateChange('due_date', value)}
                    value={this.state.due_date}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError id="description" label="Descrição" error={errors.description}>
                <TransactionDescription
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    maxLength="120"
                />
            </HorizontalFormGroupError>

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
                id="priority"
                label="Prioridade"
                error={errors.priority}
                value={this.state.priority}
                onChange={this.handleChange} />

            <HorizontalFormGroupError
                id="deadline"
                label="Prazo"
                error={errors.deadline}
                value={this.state.deadline}
                onChange={this.handleChange} />

            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.payed}
                    onChange={this.handlePayedChange}
                    />
                }
                label="Pago?"
            />

            {this.state.payed && <HorizontalFormGroupError id="payment_date" label="Pago em" error={errors.payment_date} >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    onChange={(value) => this.handleDateChange('payment_date', value)}
                    value={this.state.payment_date}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </HorizontalFormGroupError>}

            <HorizontalFormGroupError id="details" label="Detalhes" error={errors.details}>
                <RbxFormControl
                    className='border-focus-blue'
                    componentClass='textarea'
                    name="details"
                    onChange={this.handleChange}
                    value={this.state.details}
                    maxLength="500" />
            </HorizontalFormGroupError>

            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.isPeriodic}
                    onChange={this.handleIsPeriodicChange}
                    />
                }
                label="Periódico"
            />

            <Periodic 
                visible={this.state.isPeriodic}
                onChange={this.handlePeriodicChange} />

            <FormGroup>
                <Col smOffset={2} sm={10} className='text-right'>

                    <SplitHoverButton id="transaction-form-save-dropdown" bsStyle='primary' title="Salvar" disabled={disabled} 
                        onClick={(e) => this.handleOptionSelected(CLOSE, e)} 
                        onSelect={this.handleOptionSelected}>

                        <RbxMenuItem eventKey={NEW} disabled={disabled}>Salvar e novo</RbxMenuItem>
                        <RbxMenuItem eventKey={NEW_SAME_CATEGORY} disabled={disabled}>Salvar e novo (manter categoria)</RbxMenuItem>

                    </SplitHoverButton>
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
    transaction: emptyTransaction
}

export default TransactionForm;