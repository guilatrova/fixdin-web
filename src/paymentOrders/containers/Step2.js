import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Grid, Row, Col } from '@sketchpixy/rubix';

import TransactionsList from '../components/TransactionsList';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';

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
        onChange: PropTypes.func.isRequired
    }

    state = {
        checked: []
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

    render() {
        const { checked } = this.state;
        const { classes, expenses } = this.props;

        return (
            <div className={classes.root}>
                <TransactionsList
                    transactions={expenses}
                    checked={checked}
                    onToggle={this.handleToggle} />
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