import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import TransactionForm from '../components/TransactionForm';

const TransactionFormDialog = ({ open, onClose, title, fullScreen, onSubmit, isFetching, transaction, errors, ...formProps }) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}>

            <DialogTitle className="arrow-parent">{title}</DialogTitle>

            <TransactionForm
                onSubmit={onSubmit}
                isFetching={isFetching}
                transaction={transaction}
                errors={errors}
                {...formProps} />

        </Dialog>
    );
};

TransactionFormDialog.propTypes = {
    //Modal
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    //TransactionForm
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    transaction: PropTypes.object
};

export default withMobileDialog()(TransactionFormDialog);