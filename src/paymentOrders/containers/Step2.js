import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { Grid, Row, Col } from '@sketchpixy/rubix';

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
        balanceAvailable: PropTypes.number.isRequired,
        visibleExpenses: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        remainingBalance: PropTypes.number.isRequired,

        onToggle: PropTypes.func.isRequired,
        onStart: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.onStart();
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        balanceAvailable: selectors.step1.getTotal(state),
        visibleExpenses: selectors.step2.getVisibleExpenses(state),
        checked: selectors.step2.getChecked(state),
        remainingBalance: selectors.step2.getRemainingBalance(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: (id) => dispatch(operations.toggleExpense(id)),
        onStart: () => {
            dispatch(operations.resetStep2());
            dispatch(operations.checkDefaultExpenses());
        }
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(Step2)
);