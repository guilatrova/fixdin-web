import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import AccountTable from '../components/AccountTable';
import FloatingActionButton from '../../../common/material/FloatingActionButton';
import { operations, selectors } from '../duck';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
      overflowX: 'auto',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    }
});

class AccountPage extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
        accounts: PropTypes.array.isRequired,
        errors: PropTypes.object.isRequired,

        onFetch: PropTypes.func.isRequired,
    };

    state = {
    };

    componentDidMount() {
        this.props.onFetch();    
    }

    handleRefresh = () => this.props.onFetch(0);

    render() {
        const { classes, accounts } = this.props;

        return (
            <div className={classes.root}>
                <Paper>

                    <div className={classes.table}>
                        <AccountTable accounts={accounts} />
                    </div>

                    <FloatingActionButton color="primary" />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: selectors.getAccounts(state),
        isFetching: selectors.getIsFetching(state),
        errors: selectors.getErrors(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (timeout) => dispatch(operations.fetchAccounts(timeout))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(AccountPage)
);