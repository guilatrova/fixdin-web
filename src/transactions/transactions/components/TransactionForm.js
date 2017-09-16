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
import { types } from '../duck';

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
    periodic: undefined
}

const regularActions = (onClick, disabled) => {
    return (
        <SplitHoverButton id="transaction-form-save-dropdown" bsStyle='primary' title="Salvar" disabled={disabled} 
            onClick={(e) => onClick(CLOSE, e)} 
            onSelect={onClick}>

            <RbxMenuItem eventKey={NEW} disabled={disabled}>Salvar e novo</RbxMenuItem>
            <RbxMenuItem eventKey={NEW_SAME_CATEGORY} disabled={disabled}>Salvar e novo (manter categoria)</RbxMenuItem>

        </SplitHoverButton>
    );
}

const editingPeriodicActions = (onClick, disabled) => {
    return (
        <div>
            <Button onClick={() => onClick(types.EDIT_TRANSACTION)} disabled={disabled}>
                Somenta esta</Button>
            <Button onClick={() => onClick(types.EDIT_THIS_AND_NEXT_TRANSACTIONS)} disabled={disabled}>
                Esta e futuras</Button>
            <Button onClick={() => onClick(types.EDIT_ALL_PERIODIC_TRANSACTIONS)} disabled={disabled}>
                Todas as recorrências</Button>
        </div>
    );
}

export default class TransactionForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        transaction: PropTypes.object.isRequired,
        kind: PropTypes.object.isRequired
    }
    
    static defaultProps = {
        errors: { },
        transaction: emptyTransaction
    }

    constructor(props) {
        super(props);
        this.state = { 
            ...props.transaction,
            payed: !!props.transaction.payment_date,
            errors: {},
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handlePayedChange = this.handlePayedChange.bind(this);
        this.handleIsPeriodicChange = this.handleIsPeriodicChange.bind(this);
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
        const { errors, onSubmit } = this.props;
        const disabled = this.isSubmitDisabled();
        const actions = (this.state.periodic_transaction) ? 
            (disabled) => editingPeriodicActions(onSubmit, disabled) : 
            (disabled) => regularActions(this.handleOptionSelected, disabled);

        return (
        <Form horizontal>
            
            <HorizontalFormGroupError id="due_date" label="Vencimento" error={errors.due_date} >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    onChange={ (due_date) => this.setState({ due_date }) }
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
                    onChange={ (category) => this.setState({ category }) } />
            </HorizontalFormGroupError>

            <HorizontalFormGroupError id="value" label="Valor" error={errors.value}>
                <CurrencyInput 
                    className='border-focus-blue form-control'
                    onChange={ (value) => this.setState({ value }) }
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
                    onChange={ (payment_date) => this.setState({ payment_date }) }
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
                onChange={ (periodic) => this.setState({ periodic }) } />

            <FormGroup>
                <Col smOffset={2} sm={10} className='text-right'>
                    {actions(disabled)}
                </Col>
            </FormGroup>            

            </Form>
        );
    }
}