import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';
import Tooltip from 'rc-tooltip';
import Slider, { Handle } from 'rc-slider';

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
import KindSwitch from './KindSwitch';
import Periodic from './Periodic';
import { types } from '../duck';

import { EXPENSE, INCOME, getKind } from '../../kinds';

export const CLOSE = "CLOSE";
export const NEW = "NEW";
export const NEW_SAME_CATEGORY = "NEW_SAME_CATEGORY";

const emptyTransaction = {
    due_date: moment(new Date()),
    description: '',
    category: undefined,
    value: '0,00',
    deadline: undefined,
    priority: 0,
    payment_date: undefined,
    details: '',
    periodic: undefined,
    kind: EXPENSE.id
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
            <Button onClick={() => onClick(types.SAVE_TRANSACTION)} disabled={disabled}>
                Somenta esta</Button>
            <Button onClick={() => onClick(types.SAVE_THIS_AND_NEXT_TRANSACTIONS)} disabled={disabled}>
                Esta e futuras</Button>
            <Button onClick={() => onClick(types.SAVE_ALL_PERIODIC_TRANSACTIONS)} disabled={disabled}>
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
    }
    
    static defaultProps = {
        errors: { },
        transaction: emptyTransaction
    }

    constructor(props) {
        super(props);
        const kind = getKind(props.transaction.kind);

        this.state = { 
            ...props.transaction,
            payed: !!props.transaction.payment_date,
            kind,            
            errors: {},
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handlePayedChange = this.handlePayedChange.bind(this);
        this.handleIsPeriodicChange = this.handleIsPeriodicChange.bind(this);
        this.handleKindChange = this.handleKindChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
    }

    handleSubmit(type, postSaveOption = CLOSE) {
        this.props.onSubmit(type, postSaveOption, { ...this.state }, this.state.kind);
    }

    handleOptionSelected(postSaveOption) {
        this.handleSubmit(types.SAVE_TRANSACTION, postSaveOption);

        switch(postSaveOption) {
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

    handleKindChange(kind) {
        if (this.state.kind != kind) {
            this.setState({ 
                kind,
                category: undefined
            });
        }
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
                    frequency: "daily"
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
        const { errors } = this.props;
        const disabled = this.isSubmitDisabled();
        const isEdit = (this.state.id) ? true : false;
        const isCreate = !isEdit;
        const actions = (this.state.periodic_transaction) ? 
            (disabled) => editingPeriodicActions(this.handleSubmit, disabled) : 
            (disabled) => regularActions(this.handleOptionSelected, disabled);

        return (
        <Form horizontal>
            
            <KindSwitch value={this.state.kind} onChange={this.handleKindChange} />

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
                    kind={this.state.kind} 
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

            <HorizontalFormGroupError id="priority" label="Importancia" error={errors.priority}>
                <Slider min={0} max={5} defaultValue={3} marks={ { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'} }
                        value={this.state.priority} onChange={(priority) => this.setState({priority})}/>
            </HorizontalFormGroupError>

            <HorizontalFormGroupError id="deadline" label="Tolerância" error={errors.deadline} >
                <Slider min={0} max={60} step={null} marks={ { 0: '0', 15: '15', 30: '30', 60: '60'} }
                        value={this.state.deadline} onChange={(deadline) => this.setState({deadline})}/>
            </HorizontalFormGroupError>

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

            {isCreate && <FormControlLabel
                control={
                    <Switch
                    checked={this.state.isPeriodic}
                    onChange={this.handleIsPeriodicChange}
                    />
                }
                label="Periódico"
            />}

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