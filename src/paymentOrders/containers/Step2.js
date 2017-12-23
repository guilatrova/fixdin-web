import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import TransactionsList from '../components/TransactionsList';
import { operations, selectors } from '../duck';
import { formatCurrencyDisplay } from '../../services/formatter';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

class Step2 extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        balanceAvailable: PropTypes.number.isRequired,
        visibleExpenses: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        remainingBalance: PropTypes.number.isRequired,

        onToggle: PropTypes.func.isRequired,
    }

    static defaultProps = {
        remainingBalance: 0
    }

    handleToggle = value => {
        this.props.onToggle(value);
    };

    render() {
        const { 
            classes, 
            balanceAvailable, 
            visibleExpenses, 
            checked, 
            remainingBalance 
        } = this.props;

        return (
            <div className={classes.root}>

                <h3>{formatCurrencyDisplay(balanceAvailable)}</h3>

                <TransactionsList
                    transactions={visibleExpenses}
                    checked={checked}
                    onToggle={this.handleToggle} />

                <h3>{formatCurrencyDisplay(remainingBalance)}</h3>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balanceAvailable: selectors.step1.getTotal(state),
        visibleExpenses: selectors.step2.getVisibleExpenses(state),
        checked: selectors.step2.getChecked(state),
        remainingBalance: selectors.step2.getRemainingBalance(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: (id) => dispatch(operations.toggleExpense(id))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Step2)
);