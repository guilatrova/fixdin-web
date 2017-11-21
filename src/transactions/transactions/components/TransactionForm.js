import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DatePicker } from 'material-ui-pickers';
import Button from 'material-ui/Button';
import Slider from 'rc-slider';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import TextFieldCurrency from '../../../common/material/TextFieldCurrency';
import TextFieldError from '../../../common/material/TextFieldError';
// import CategorySelectPicker from './../../categories/components/CategorySelectPicker';
// import TransactionDescription from './TransactionDescription';

import KindSwitch from '../../components/KindSwitch';
import Periodic from './Periodic';
import CategorySelectPicker from '../../categories/components/CategorySelectPicker';
import { EXPENSE, getKind } from '../../kinds';
import { types } from '../duck';

export const CLOSE = "CLOSE";
export const NEW = "NEW";
export const NEW_SAME_CATEGORY = "NEW_SAME_CATEGORY";

const emptyTransaction = {
    due_date: moment(new Date()),
    description: '',
    category: undefined,
    value: 0,
    deadline: undefined,
    priority: 0,
    payment_date: undefined,
    details: '',
    periodic: undefined,
    kind: EXPENSE.id
};

const regularActions = (onClick, disabled) => {
    return (
        <div>
            <Button onClick={() => onClick(types.CLOSE)} disabled={disabled}>
                Salvar</Button>
            <Button onClick={() => onClick(types.NEW)} disabled={disabled}>
                Salvar e novo</Button>                
        </div>        
    );
};

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
        transaction: emptyTransaction,

        onSubmit: () => {},
        isFetching: false,    
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

    handlePayedChange = (e, checked) => {
        this.setState({
            payed: checked,
            payment_date: checked ? moment(new Date()) : null
        });
    }    

    handleIsPeriodicChange(e, checked) {
        this.setState({ 
            isPeriodic: checked,
            periodic: checked ? { frequency: "daily" } : null
        });
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
        <form>
            
            <KindSwitch value={this.state.kind} onChange={this.handleKindChange} />

            <DatePicker
                label="Vencimento"
                value={this.state.due_date}
                onChange={(due_date) => this.setState({ due_date })}
                autoOk={true}
                format="DD MMMM YYYY"
            />

            <TextFieldError
                name="description"
                label="Descrição"
                error={errors.description}
                value={this.state.description}
                onChange={this.handleChange}
                maxLength="120"
            />

            {/* <TransactionDescription
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                maxLength="120"
            />*/}

            <div>
                <InputLabel htmlFor="category-picker">Categoria</InputLabel>

                <CategorySelectPicker 
                    id="category-picker"
                    kind={this.state.kind} 
                    value={this.state.category}
                    onChange={category => this.setState({ category })} />
            </div>

            {/* <TextFieldError id="category" label="Categoria" error={errors.category}> */}
                {/* <CategorySelectPicker 
                    kind={this.state.kind} 
                    value={this.state.category}
                    onChange={ (category) => this.setState({ category }) } /> */}
            {/* </HorizontalFormGroupError> */}

            <FormControl>
                <InputLabel htmlFor="id">Valor</InputLabel>

                <TextFieldCurrency 
                    id="value"
                    label="Valor" 
                    error={errors.value}
                    value={this.state.value}
                    onChange={value => this.setState({ value: value.floatValue })}
                />
            </FormControl>

            <div style={{width:"500px"}}>
                <InputLabel htmlFor="priority-slider">Importância</InputLabel>

                <Slider id="priority-slider" min={0} max={5} defaultValue={3} marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'}}
                        value={this.state.priority} onChange={(priority) => this.setState({priority})}/>

                {/* ERRORS */}
            </div>

            <div style={{width:"500px"}}>
                <InputLabel htmlFor="priority-slider">Tolerância</InputLabel>

                <Slider min={0} max={60} step={null} marks={ { 0: '0', 5: '5', 15: '15', 30: '30', 60: '60'} }
                        value={this.state.deadline} onChange={(deadline) => this.setState({deadline})}/>

                {/* ERRORS */}
            </div>

            <FormControlLabel
                control={
                    <Switch
                        checked={this.state.payed}
                        onClick={e => this.handlePayedChange(e, !this.state.payed)}
                    />
                }
                label="Pago"
            />

            {this.state.payed && 
                <DatePicker 
                    label="Pago em"
                    value={this.state.payment_date}
                    onChange={(payment_date) => this.setState({ payment_date })}
                    autoOk={true}
                    format="DD MMMM YYYY"
                />
            }

            <TextFieldError
                multiline
                name="details"
                label="Detalhes"
                rows="4"
                value={this.state.details}
                onChange={this.handleChange}
                error={errors.details}
            />

            {isCreate && <FormControlLabel
                control={
                    <Switch
                        checked={this.state.isPeriodic}
                        onClick={e => this.handleIsPeriodicChange(e, !this.state.isPeriodic)}
                    />
                }
                label="Periódico"
            />}

            <Periodic 
                visible={this.state.isPeriodic}
                onChange={periodic => this.setState({ periodic })} />

            <div>
                {actions(disabled)}
            </div>

            </form>
        );
    }
} 