import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Grid, Row, Col } from '@sketchpixy/rubix';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

import TransactionsList from '../components/TransactionsList';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';
import { selectors as balancesSelectors } from '../../balances/duck';
import { formatCurrencyDisplay, formatCurrency } from '../../services/formatter';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

export class Step1 extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        incomes: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        currentBalance: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checked = this.getDefaultIncomesToBeChecked(props.incomes);
        const visibleIncomes = this.getIncomesUntil(props.incomes, today);
        const valueToSave = "R$ 0,00";

        this.state = {
            checked,
            visibleIncomes,
            valueToSave,
            untilDate: today,
            ...this.getSum(checked, visibleIncomes, valueToSave)
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state) {
            this.props.onChange(this.state);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.incomes.length == 0 && nextProps.incomes.length > 0) {

            const newChecked = this.getDefaultIncomesToBeChecked(nextProps.incomes);
            const visibleIncomes = this.getIncomesUntil(nextProps.incomes);

            this.setState({ 
                checked: newChecked,                
                visibleIncomes,
                ...this.getSum(newChecked, visibleIncomes)
            });
        }
    }

    getDefaultIncomesToBeChecked = incomes => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return incomes.filter(income => 
            income.due_date.isSameOrAfter(today)).map(income => income.id);
    }

    getIncomesUntil = (incomes, untilDate) => {
        if (!untilDate) {
            untilDate = this.state.untilDate;
        }

        return incomes.filter(income => income.due_date.isSameOrBefore(untilDate))
    }

    getSum = (checked, visibleIncomes, valueToSave) => {
        if (!visibleIncomes) {
            visibleIncomes = this.state.visibleIncomes;
        }
        
        if (!valueToSave) {
            valueToSave = this.state.valueToSave;
        }

        const filtered = visibleIncomes
            .filter(income => checked.includes(income.id)).map(income => income.value);

        const totalChecked = filtered.reduce((acc, cur) => acc + cur, 0);
        const toSave = formatCurrency(valueToSave);
        const total = this.props.currentBalance + totalChecked - toSave;

        return {
            totalChecked,
            total
        };
    }

    handleDateChange = untilDate => {
        const visibleIncomes = this.getIncomesUntil(this.props.incomes, untilDate);
        const checked = this.state.checked.filter(incomeId => visibleIncomes.map(income => income.id).includes(incomeId));

        this.setState({ 
            checked,
            untilDate,
            visibleIncomes,
            ...this.getSum(checked, visibleIncomes)
        });
    }

    handleValueToSaveChange = valueToSave => {
        this.setState({ 
            valueToSave,
            ...this.getSum(this.state.checked, this.state.visibleIncomes, valueToSave)
        });
    }

    handleToggle = value => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
            ...this.getSum(newChecked)
        });
    };

    render() {
        const { classes, currentBalance } = this.props;
        const { visibleIncomes, checked, total, totalChecked, valueToSave } = this.state;

        return (
            <div className={classes.root}>
            <Row>
                <Col xs={12} md={3}>

                    <DatetimeInput
                        onChange={this.handleDateChange}
                        value={this.state.untilDate}
                        timeFormat={false}
                        closeOnSelect={true}
                        closeOnTab={true} />

                    <CurrencyInput 
                        className='border-focus-blue form-control'
                        onChange={this.handleValueToSaveChange}
                        value={valueToSave}
                        prefix="R$ "
                        decimalSeparator=","
                        thousandSeparator="." />

                    <h3>{ formatCurrencyDisplay(currentBalance) }</h3>
                    <h3>+ { formatCurrencyDisplay(totalChecked) }</h3>
                    <h3>- { valueToSave }</h3>
                    <h1>{ formatCurrencyDisplay(total) }</h1>
                    
                </Col>

                <Col xs={12} md={9}>
                    <TransactionsList
                        transactions={visibleIncomes}
                        checked={checked}
                        onToggle={this.handleToggle} />
                </Col>
            </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        incomes: transactionsSelectors.getPendingIncomesUntil(state),
        currentBalance: balancesSelectors.getRealBalance(state)
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(Step1)
);