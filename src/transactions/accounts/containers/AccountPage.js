import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import AccountFormDialogContainer from './AccountFormDialogContainer';
import TransferFormDialog from './TransferFormDialog';
import AccountTable from './AccountTableContainer';
import { operations, selectors } from '../duck';
import { ARCHIVED_STATUS } from '../status';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        overflow: 'auto',
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
        onEdit: PropTypes.func.isRequired,
        onArchive: PropTypes.func.isRequired,
        onTransfer: PropTypes.func.isRequired,
        onFinishEdit: PropTypes.func.isRequired,
    };

    state = {
        openAccountFormDialog: false,
        openTransferFormDialog: false
    };

    componentDidMount = () => this.props.onFetch();

    handleRefresh = () => this.props.onFetch(0);

    // Account Form
    handleOpenAccountFormDialog = () => this.setState({ openAccountFormDialog: true });

    handleCloseAccountFormDialog = () => {
        this.setState({ openAccountFormDialog: false });
        this.props.onFinishEdit();
    }

    // Transfer Form
    handleOpenTransferFormDialog = () => this.setState({ openTransferFormDialog: true });

    handleTransferFormSubmit = (value, from, to) => {
        this.props.onTransfer(value, from, to).then(({ result }) => {
            if (result == 'success') {
                this.handleCloseTransferFormSubmit();
            }
        });
    }

    handleCloseTransferFormSubmit = () => this.setState({ openTransferFormDialog: false });

    handleEdit = (id) => {
        this.handleOpenAccountFormDialog();
        this.props.onEdit(id);
    }

    handleArchive = (id) => {
        const account = this.props.accounts.find(acc => acc.id == id);
        const reverse = account.status == ARCHIVED_STATUS;
        this.props.onArchive(id, reverse);
    }

    handleTransfer = (transferringFromAccountId) => {
        const transferringFromAccount = this.props.accounts
            .find(acc => acc.id == transferringFromAccountId);
        this.setState({ transferringFromAccount });
        this.handleOpenTransferFormDialog();
    }

    render() {
        const { classes, accounts, errors, isFetching } = this.props;

        return (
            <div className={classes.root}>

                <Paper className={classes.paper}>

                    <AccountTable
                        accounts={accounts}
                        onAdd={this.handleOpenAccountFormDialog}
                        onArchive={this.handleArchive}
                        onRefresh={this.handleRefresh}
                        onEdit={this.handleEdit}
                        onTransfer={this.handleTransfer}
                    />

                </Paper>

                <AccountFormDialogContainer
                    open={this.state.openAccountFormDialog}
                    onClose={this.handleCloseAccountFormDialog}
                />

                <TransferFormDialog
                    open={this.state.openTransferFormDialog}
                    onSubmit={this.handleTransferFormSubmit}
                    onClose={this.handleCloseTransferFormSubmit}
                    title="Efetuar transferência"
                    fromAccount={this.state.transferringFromAccount}
                    errors={errors}
                    isFetching={isFetching}
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accounts: selectors.getAccounts(state),
    isFetching: selectors.isFetching(state),
    errors: selectors.getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
    onFetch: (timeout) => dispatch(operations.fetchAccounts(timeout)),
    onEdit: (id) => dispatch(operations.editAccount(id)),
    onArchive: (id, reverse) => dispatch(operations.archiveAccount(id, reverse)),
    onTransfer: (value, from, to) => dispatch(operations.saveTransfer(value, from, to)),
    onFinishEdit: () => dispatch(operations.finishEditAccount())
});

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(AccountPage)
);
