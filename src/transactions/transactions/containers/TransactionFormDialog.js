import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog';
  
import TransactionForm from '../components/TransactionForm';

const TransactionFormDialog = ({open, onRequestClose, title, fullScreen, onSubmit, isFetching, transaction, errors}) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onRequestClose={onRequestClose}>

            <DialogTitle>{title}</DialogTitle>

            <TransactionForm 
                onSubmit={onSubmit} 
                isFetching={isFetching}
                transaction={transaction}
                errors={errors} />

        </Dialog>
    );
};

TransactionFormDialog.propTypes = {
    //Modal
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    //TransactionForm
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    transaction: PropTypes.object
};

export default withMobileDialog()(TransactionFormDialog);