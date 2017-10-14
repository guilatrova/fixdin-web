import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { Grid, Row, Col } from '@sketchpixy/rubix';

import TransactionsList from '../components/TransactionsList';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';
import { formatCurrencyDisplay } from '../../services/formatter';
import { comparators } from '../../transactions/transactions/duck';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

class Step2 extends React.Component {
    static propTypes = {
        balanceAvailable: PropTypes.number.isRequired,
        expenses: PropTypes.array.isRequired,
        until: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        const visibleExpenses = props.expenses.filter(expense => expense.due_date.isSameOrBefore(props.until));
        const { checked, remainingBalance } = 
            this.getDefaultExpensesToBeCheckedWithRemainingBalance(visibleExpenses);

        this.state = {
            checked,
            visibleExpenses,
            remainingBalance
        }
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
            checked: newChecked
        });
    };

    getDefaultExpensesToBeCheckedWithRemainingBalance = expenses => {
        const sorted = expenses.sort(comparators.expensesToBePaidCompare);
        const checked = [];
        let balance = this.props.balanceAvailable;

        for (let i in sorted) {
            let expense = sorted[i];
            const diffBalance = balance + expense.value; //It's plus because expense is already negative

            if (diffBalance > 0) {
                balance = diffBalance;
                checked.push(expense.id);
            }
        }

        return {
            checked,
            remainingBalance: balance
        }
    }

    render() {
        const { checked, visibleExpenses, remainingBalance } = this.state;
        const { classes, expenses, balanceAvailable } = this.props;

        return (
            <div className={classes.root}>

                <h3>{formatCurrencyDisplay(balanceAvailable)}</h3>

                <TransactionsList
                    transactions={visibleExpenses}
                    checked={checked}
                    onToggle={this.handleToggle} />

                <h3>{formatCurrencyDisplay(remainingBalance)}</h3>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: transactionsSelectors.getPendingExpensesUntil(state)
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(Step2)
);