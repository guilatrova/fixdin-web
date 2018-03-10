import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import { operations, selectors } from '../duck';
import { formatCurrencyDisplay } from '../../utils/formatters';

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
        nextExpenses: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        remainingBalance: PropTypes.number.isRequired,
        isFetching: PropTypes.bool.isRequired,

        onToggle: PropTypes.func.isRequired,
    }

    static defaultProps = {
        remainingBalance: 0
    }

    render() {
        const { 
            classes, 
            balanceAvailable, 
            checked, 
            remainingBalance,
            nextExpenses,
            onToggle,
            isFetching
        } = this.props;

        if (isFetching)
            return 'loading';

        return (
            <div className={classes.root}>

                <h3>{formatCurrencyDisplay(balanceAvailable)}</h3>

                <TransactionsOverTimeTable transactions={nextExpenses} checked={checked} onToggle={onToggle} />

                <h3>{formatCurrencyDisplay(remainingBalance)}</h3>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balanceAvailable: selectors.step1.getTotal(state),
        checked: selectors.step2.getChecked(state),
        remainingBalance: selectors.step2.getRemainingBalance(state),
        nextExpenses: selectors.step2.getNextExpenses(state),
        isFetching: selectors.step2.isFetching(state)
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