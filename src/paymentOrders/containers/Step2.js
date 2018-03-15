import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import TransactionsOverTimeTable from '../components/TransactionsOverTimeTable';
import { formatCurrencyDisplay } from '../../utils/formatters';
import { operations, selectors } from '../duck';
import { selectors as balanceSelectors } from '../../balances/duck';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
    table: {
        overflowX: 'auto',
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

                <div className={classes.table}>
                    <TransactionsOverTimeTable transactions={nextExpenses} checked={checked} onToggle={onToggle} />
                </div>

                <h3>{formatCurrencyDisplay(remainingBalance)}</h3>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balanceAvailable: balanceSelectors.getRealBalance(state) || 0,
        checked: selectors.getChecked(state),
        remainingBalance: selectors.getRemainingBalance(state),
        nextExpenses: selectors.getNextExpenses(state),
        isFetching: selectors.isFetching(state)
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