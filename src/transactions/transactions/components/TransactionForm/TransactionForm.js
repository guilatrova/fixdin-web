import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import DatePicker from 'material-ui-pickers/DatePicker';
import Switch from '@material-ui/core/Switch';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormLabel from '@material-ui/core/FormLabel';

import CurrencyTextField from '../../../../common/material/CurrencyTextField';
import TextFieldError from '../../../../common/material/TextFieldError';
import Slider from '../../../../common/material/Slider';
import TransactionDescription from '../../components/TransactionDescription';
import KindSwitch from '../../../shared/components/KindSwitch';
import Periodic from './Periodic';
import CategorySelectPicker from '../../../categories/components/CategorySelectPicker';
import { getKind } from '../../../shared/kinds';
import { types } from '../../duck';
import specifications from '../../specifications';
import AccountSelectPicker from '../../../accounts/components/AccountSelectPicker';
import Actions from './actions';
import saveOptions from './consts/saveOptions';
import emptyTransaction from './consts/emptyTransaction';

const styles = theme => ({
    root: {
        minWidth: 500,
        padding: 20
    },
    formRow: {
        marginBottom: 10
    },
    flexSpread: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
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

    handleSubmit = (type, postSaveOption = saveOptions.CLOSE) => this.props.onSubmit(type, postSaveOption, { ...this.state });

    handleOptionSelected = (postSaveOption) => {
        this.handleSubmit(types.SAVE_TRANSACTION, postSaveOption);

        switch (postSaveOption) {
            case saveOptions.NEW:
                this.setState({ ...emptyTransaction, errors: {} });
                break;

            case saveOptions.NEW_SAME_CATEGORY:
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
        const { errors, classes } = this.props;
        const disabled = this.isSubmitDisabled();
        const isEdit = (this.state.id) ? true : false;
        const isCreate = !isEdit;
        const isPeriodic = specifications.isPeriodic(this.state);
        const onClickAction = isPeriodic ? this.handleSubmit : this.handleOptionSelected;

        return (
            <React.Fragment>
                <DialogContent className={classes.root}>

                    <div className={cn(classes.flexSpread, classes.formRow)}>
                        <KindSwitch value={this.state.kind} onChange={this.handleKindChange} />

                        <CurrencyTextField
                            id="value"
                            label="Valor"
                            error={errors.value}
                            value={this.state.value}
                            onChangeEvent={(e, maskedValue, value) => this.setState({ value })}
                        />
                    </div>

                    <DatePicker
                        className={classes.formRow}
                        keyboard
                        fullWidth
                        label="Vencimento"
                        value={this.state.due_date}
                        onChange={(due_date) => this.setState({ due_date })}
                        autoOk={true}
                        format="DD MMMM YYYY"
                    />

                    <AccountSelectPicker
                        className={classes.formRow}
                        label="Conta"
                        value={this.state.account}
                        onChange={(account) => this.setState({ account })}
                    />

                    <TransactionDescription
                        className={classes.formRow}
                        fullWidth
                        value={this.state.description}
                        error={errors.description}
                        onChange={description => this.setState({ description })}
                    />

                    {/* TODO: ADD ERROR MESSAGE */}
                    <div className={classes.formRow}>
                        <CategorySelectPicker
                            id="category-picker"
                            kind={this.state.kind}
                            value={this.state.category}
                            onChange={category => this.setState({ category })}
                        />
                    </div>

                    {/* TODO: ADD ERROR MESSAGE */}
                    <div className={classes.formRow}>
                        <Slider
                            label="Importância"
                            min={1} max={5} step={1}
                            value={this.state.priority}
                            onChange={(ev, priority) => this.setState({ priority })}
                        />
                    </div>

                    {/* TODO: ADD ERROR MESSAGE */}
                    <div className={classes.formRow}>
                        <Slider
                            label="Tolerância"
                            min={0} max={60} step={5}
                            value={this.state.deadline}
                            onChange={(ev, deadline) => this.setState({ deadline })}
                        />
                    </div>

                    <div className={cn(classes.formRow, classes.flexSpread)}>
                        <div className={classes.flex}>
                            <FormLabel component="legend">Pago</FormLabel>

                            <Switch
                                color="primary"
                                checked={this.state.payed}
                                onClick={e => this.handlePayedChange(e, !this.state.payed)}
                            />
                        </div>

                        {this.state.payed &&
                            <DatePicker
                                keyboard
                                label="Pago em"
                                value={this.state.payment_date}
                                onChange={(payment_date) => this.setState({ payment_date })}
                                autoOk={true}
                                format="DD MMMM YYYY"
                            />
                        }
                    </div>

                    <TextFieldError
                        fullWidth
                        multiline
                        name="details"
                        label="Detalhes"
                        rowsMax="6"
                        className={classes.formRow}
                        value={this.state.details}
                        onChange={this.handleChange}
                        error={errors.details}
                    />

                    {isCreate && <div className={classes.flex}>
                        <FormLabel component="legend">Periódico</FormLabel>

                        <Switch
                            color="primary"
                            checked={this.state.isPeriodic}
                            onClick={e => this.handleIsPeriodicChange(e, !this.state.isPeriodic)}
                        />
                    </div>}

                    <Periodic
                        visible={this.state.isPeriodic}
                        onChange={periodic => this.setState({ periodic })} />

                </DialogContent>

                <DialogActions>
                    <Actions disabled={disabled} periodic={isPeriodic} onClick={onClickAction} />
                </DialogActions>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TransactionForm);
