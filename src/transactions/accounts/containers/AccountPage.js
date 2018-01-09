import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import AccountFormDialog from './AccountFormDialog';
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
        onSave: PropTypes.func.isRequired
    };

    state = {
        openAccountFormDialog: false
    };

    componentDidMount = () => this.props.onFetch();

    handleRefresh = () => this.props.onFetch(0);

    handleCreateClick = () => this.setState({ openAccountFormDialog: true });

    handleAccountFormSubmit = (id, account) => {
        this.props.onSave(id, account).then(({result}) => {
            if (result == 'success') {
                this.handleCloseAccountFormDialog();
            }
        });
    }

    handleCloseAccountFormDialog = () => this.setState({ openAccountFormDialog: false });

    render() {
        const { classes, accounts, errors, isFetching } = this.props;

        return (
            <div className={classes.root}>
                <Paper>

                    <div className={classes.table}>
                        <AccountTable accounts={accounts} />
                    </div>

                    <AccountFormDialog 
                        open={this.state.openAccountFormDialog}
                        onSubmit={this.handleAccountFormSubmit}
                        onClose={this.handleCloseAccountFormDialog}
                        title="Criar conta"
                        errors={errors}
                        isFetching={isFetching}
                    />

                    <FloatingActionButton color="primary" onClick={this.handleCreateClick} />
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
        onFetch: (timeout) => dispatch(operations.fetchAccounts(timeout)),
        onSave: (id, account) => dispatch(operations.saveAccount(id, account))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(AccountPage)
);