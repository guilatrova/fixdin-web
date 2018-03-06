import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { DatePicker } from 'material-ui-pickers';

import TransactionsList from '../components/TransactionsList';
import CurrencyTextField from '../../common/material/CurrencyTextField';
import { selectors as balancesSelectors } from '../../balances/duck';
import { operations, selectors } from '../duck';
import { formatCurrencyDisplay } from '../../services/formatter';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

class Step1 extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        
        currentBalance: PropTypes.number.isRequired,
        visibleIncomes: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        totalChecked: PropTypes.number.isRequired,
        valueToSave: PropTypes.number.isRequired,
        untilDate: PropTypes.object.isRequired,
        checked: PropTypes.array.isRequired,

        onChangeUntilDate: PropTypes.func.isRequired,
        onChangeValueToSave: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
    }

    handleDateChange = untilDate => {
        this.props.onChangeUntilDate(untilDate);
    }

    handleValueToSaveChange = value => {
        this.props.onChangeValueToSave(value);
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
            <Grid container spacing={24}>
                <Grid item xs={12} md={3}>

                    <DatePicker
                        keyboard
                        label="Até dia"
                        value={untilDate}
                        onChange={this.handleDateChange}
                        autoOk={true}
                        format="DD MMMM YYYY"
                    />

                    <CurrencyTextField
                        id="savings"
                        label="Poupar"
                        onChangeEvent={(e, masked, value) => this.handleValueToSaveChange(value)}
                        value={valueToSave}
                    />

                    <h3>{ formatCurrencyDisplay(currentBalance) }</h3>
                    <h3>+ { formatCurrencyDisplay(totalChecked) }</h3>
                    <h3>- { formatCurrencyDisplay(valueToSave) }</h3>
                    <h1>{ formatCurrencyDisplay(total) }</h1>
                    
                </Grid>

                <Grid item xs={12} md={9}>
                    <TransactionsList
                        transactions={visibleIncomes}
                        checked={checked}
                        onToggle={this.handleToggle} />
                </Grid>
            </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentBalance: balancesSelectors.getRealBalance(state) || 0,
        visibleIncomes: selectors.step1.getVisibleIncomes(state),
        total: selectors.step1.getTotal(state) || 0,
        totalChecked: selectors.step1.getTotalChecked(state),
        valueToSave: selectors.step1.getValueToSave(state),
        untilDate: selectors.step1.getUntilDate(state),
        checked: selectors.step1.getChecked(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeUntilDate: (untilDate) => dispatch(operations.changeUntilDate(untilDate)),
        onChangeValueToSave: (value=0) => dispatch(operations.changeValueToSave(value)),
        onToggle: (ids) => dispatch(operations.toggleIncome(ids))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Step1)
);