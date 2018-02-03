import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { selectors, operations } from '../duck';
import Paper from 'material-ui/Paper';
import TransferTable from '../components/TransferTable';
import ConfirmDeleteDialog from '../../../common/material/ConfirmDeleteDialog';

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

class TransferPage extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,

        accountId: PropTypes.number.isRequired,
        accountsNames: PropTypes.array.isRequired,
        transfers: PropTypes.array.isRequired,
        errors: PropTypes.object.isRequired,
        onFetch: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    state = {
        openDeleteDialog: false
    }

    componentDidMount() {
        const { onFetch, accountId } = this.props;
        onFetch(accountId);
    }

    handleDelete = (toDeleteId) => this.setState({ openDeleteDialog: true, toDeleteId });

    handleCloseDeleteDialog = () => this.setState({ openDeleteDialog: false, toDeleteId: undefined });
    
    handleConfirmDelete = () => {
        const { toDeleteId } = this.state;
        const { onDelete } = this.props;
        onDelete(toDeleteId).then(({result}) => {
            if (result == 'success') {
                this.handleCloseDeleteDialog();
            }
        });
    }

    render() {
        const { transfers, accountsNames, classes, errors } = this.props;

        return (
            <div className={classes.root}>
                <Paper>
                    <TransferTable 
                        transfers={transfers}
                        accountsNames={accountsNames}
                        onEdit={() => {}}
                        onDelete={this.handleDelete} />
                </Paper>

                <ConfirmDeleteDialog
                    open={this.state.openDeleteDialog} 
                    onClose={this.handleCloseDeleteDialog} 
                    onConfirm={this.handleConfirmDelete}
                    error={errors.detail} >

                    Tem certeza que deseja deletar esta transferência?
                </ConfirmDeleteDialog>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const accountId = parseInt(ownProps.match.params.accountId);
    return {
        accountId,
        transfers: selectors.getTransfersOfAccount(state, accountId),
        accountsNames: selectors.getAccountsNamesMappedById(state),
        errors: selectors.getErrors(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (accountId, timeout) => {
            dispatch(operations.fetchAccounts(timeout));
            dispatch(operations.fetchTransfers(accountId, timeout));
        },
        onDelete: (transferId) => dispatch(operations.deleteTransfer(transferId))
    };
};

//TODO transfers:
// 404 if not found

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TransferPage)
);