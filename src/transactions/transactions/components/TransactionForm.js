import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles } from 'material-ui/styles';
import { DatePicker } from 'material-ui-pickers';
import Button from 'material-ui/Button';
import Slider from 'rc-slider';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
import { InputLabel } from 'material-ui/Input';

import CurrencyTextField from '../../../common/material/CurrencyTextField';
import TextFieldError from '../../../common/material/TextFieldError';
import TransactionDescription from '../components/TransactionDescription';
import KindSwitch from '../../components/KindSwitch';
import Periodic from './Periodic';
import CategorySelectPicker from '../../categories/components/CategorySelectPicker';
import { EXPENSE, getKind } from '../../kinds';
import { types } from '../duck';
import specifications from '../specifications';
import AccountAutocomplete from '../../accounts/components/AccountAutocomplete';

export const CLOSE = "CLOSE";
export const NEW = "NEW";
export const NEW_SAME_CATEGORY = "NEW_SAME_CATEGORY";

const emptyTransaction = {
    due_date: moment(new Date()),
    description: '',
    category: undefined,
    value: 0,
    deadline: undefined,
    priority: 1,
    payment_date: undefined,
    details: '',
    periodic: undefined,
    kind: EXPENSE.id
};

const regularActions = (onClick, disabled, classes) => {
    return (
        <div>
            <Button variant="raised" color="primary" onClick={() => onClick(types.CLOSE)} disabled={disabled} className={classes.button}>
                Salvar</Button>
            <Button variant="raised" color="default" onClick={() => onClick(types.NEW)} disabled={disabled} className={classes.button}>
                Salvar e novo</Button>                
        </div>        
    );
};

const editingPeriodicActions = (onClick, disabled, classes) => {
    return (
        <div>
            <Button variant="raised" color="primary" onClick={() => onClick(types.SAVE_TRANSACTION)} disabled={disabled} className={classes.button}>
                Somenta esta</Button>
            <Button variant="raised" color="default" onClick={() => onClick(types.SAVE_THIS_AND_NEXT_TRANSACTIONS)} disabled={disabled} className={classes.button}>
                Esta e futuras</Button>
            <Button variant="raised" color="default" onClick={() => onClick(types.SAVE_ALL_PERIODIC_TRANSACTIONS)} disabled={disabled} className={classes.button}>
                Todas as recorrências</Button>
        </div>
    );
};

const styles = theme => ({
    root: {
        minWidth: 500,
        padding: 20
    },
    widthLimit: {
        maxWidth: 300
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class TransactionForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        transaction: PropTypes.object.isRequired,
        accounts: PropTypes.array.isRequired
    }
    
    static defaultProps = {
        transaction: emptyTransaction
    }

    constructor(props) {
        super(props);
        const kind = getKind(props.transaction.kind);

        this.state = { 
            ...props.transaction,
            payed: !!props.transaction.payment_date,
            account: props.transaction.account || props.accounts[0].id,
            kind,
            errors: {},
        };
    }

    handleSubmit = (type, postSaveOption = CLOSE) => this.props.onSubmit(type, postSaveOption, { ...this.state }, this.state.kind);    

    handleOptionSelected = (postSaveOption) => {
        this.handleSubmit(types.SAVE_TRANSACTION, postSaveOption);

        switch(postSaveOption) {
            case NEW:
                this.setState({ ...emptyTransaction, errors: {} });
                break;

            case NEW_SAME_CATEGORY:
                this.setState({ ...emptyTransaction, errors: {}, category: this.state.category });
                break;
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    handleKindChange = (kind) => {
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

    handleIsPeriodicChange = (e, checked) => {
        this.setState({ 
            isPeriodic: checked,
            periodic: checked ? { frequency: "daily" } : null
        });
    }

    handleAccountChange = (account) => {        
        if (account) {
            this.setState({ account: account.id });
        }
        else {
            this.setState({ account: undefined });
        }
    }

    isSubmitDisabled = () => {
        let disabled = false;
        if (this.props.isFetching) {
            disabled = true;
        }       
        else if (this.state.value === '' || this.state.value === undefined) { //0 is enabled
            disabled = true;
        }
        else if (!moment.isMoment(this.state.due_date)) {            
            disabled = true;
        }
        else {
            disabled = !(this.state.due_date && 
                this.state.category && this.state.description && this.state.account);
        }
        
        return disabled;
    }
    
    render() {
        const { errors, classes, accounts } = this.props;
        const selectedAccount = accounts.find(account => account.id === this.state.account);
        const disabled = this.isSubmitDisabled();
        const isEdit = (this.state.id) ? true : false;
        const isCreate = !isEdit;
        const actions = (specifications.isPeriodic(this.state)) ? 
            (disabled) => editingPeriodicActions(this.handleSubmit, disabled, classes) : 
            (disabled) => regularActions(this.handleOptionSelected, disabled, classes);

        return (
        <div className={classes.root}>
            <DialogContent>

                <KindSwitch value={this.state.kind} onChange={this.handleKindChange} />

                <AccountAutocomplete
                    value={selectedAccount}
                    onChange={this.handleAccountChange}
                />

                <DatePicker
                    label="Vencimento"
                    value={this.state.due_date}
                    onChange={(due_date) => this.setState({ due_date })}
                    autoOk={true}
                    format="DD MMMM YYYY"
                />

                <TransactionDescription
                    value={this.state.description}
                    error={errors.description}
                    onChange={description => this.setState({ description })}
                />

                <div className={classes.widthLimit}>
                    <InputLabel htmlFor="category-picker">Categoria</InputLabel>

                    <CategorySelectPicker 
                        id="category-picker"
                        kind={this.state.kind} 
                        value={this.state.category}
                        onChange={category => this.setState({ category })} />
                </div>

                {/*TODO: <TextFieldError id="category" label="Categoria" error={errors.category}> */}
                    {/* <CategorySelectPicker 
                        kind={this.state.kind} 
                        value={this.state.category}
                        onChange={ (category) => this.setState({ category }) } /> */}
                {/* </HorizontalFormGroupError> */}

                <CurrencyTextField
                    id="value"
                    label="Valor"
                    error={errors.value}
                    value={this.state.value}
                    onChangeEvent={(e, maskedValue, value) => this.setState({ value })}
                />

                <div className={classes.widthLimit}>
                    <InputLabel htmlFor="priority-slider">Importância</InputLabel>

                    <Slider id="priority-slider" min={1} max={5} defaultValue={3} marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'}}
                            value={this.state.priority} onChange={(priority) => this.setState({priority})}/>

                    {/*TODO: ERRORS or wait new slider */}
                </div>

                <div className={classes.widthLimit}>
                    <InputLabel htmlFor="priority-slider">Tolerância</InputLabel>

                    <Slider min={0} max={60} step={null} marks={{ 0: '0', 5: '5', 15: '15', 30: '30', 60: '60'}}
                            value={this.state.deadline} onChange={(deadline) => this.setState({deadline})}/>

                    {/*TODO: ERRORS or wait new slider */}
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

            </DialogContent>

            <DialogActions>
                {actions(disabled)}
            </DialogActions>

        </div>
        );
    }
} 

export default withStyles(styles)(TransactionForm);