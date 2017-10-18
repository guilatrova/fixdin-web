import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Grid, Row, Col } from '@sketchpixy/rubix';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

import TransactionsList from '../components/TransactionsList';
import { selectors as balancesSelectors } from '../../balances/duck';
import { operations, selectors } from '../duck';
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
        
        currentBalance: PropTypes.number.isRequired,
        visibleIncomes: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        totalChecked: PropTypes.number.isRequired,
        valueToSave: PropTypes.number.isRequired,
        untilDate: PropTypes.object.isRequired,

        onChangeUntilDate: PropTypes.func.isRequired,
        onChangeValueToSave: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        onStart: PropTypes.func.isRequired,
        
        onChange: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.onStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state) {
            this.props.onChange(this.state);
        }
    }

    handleDateChange = untilDate => {
        this.props.onChangeUntilDate(untilDate);
    }

    handleValueToSaveChange = valueToSave => {
        valueToSave = formatCurrency(valueToSave);
        this.props.onChangeValueToSave(valueToSave);
    }

    handleToggle = value => {
        this.props.onToggle(value);
    };

    render() {
        const { 
            classes, 
            untilDate,
            currentBalance,
            visibleIncomes, 
            total, 
            totalChecked, 
            valueToSave, 
            checked 
        } = this.props;

        return (
            <div className={classes.root}>
            <Row>
                <Col xs={12} md={3}>

                    <DatetimeInput
                        onChange={this.handleDateChange}
                        value={untilDate}
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
        currentBalance: balancesSelectors.getRealBalance(state),
        visibleIncomes: selectors.getVisibleIncomes(state),
        total: selectors.getTotal(state),
        totalChecked: selectors.getTotalChecked(state),
        valueToSave: formatCurrencyDisplay(selectors.getValueToSave(state)),
        untilDate: selectors.getUntilDate(state),
        checked: selectors.getChecked(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeUntilDate: (untilDate) => dispatch(operations.changeUntilDate(untilDate)),
        onChangeValueToSave: (value) => dispatch(operations.changeValueToSave(value)),
        onToggle: (ids) => dispatch(operations.toggleIncome(ids)),
        onStart: () => {
            dispatch(operations.reset());
            dispatch(operations.checkDefaultIncomes());
        }
    }
}

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Step1)
);