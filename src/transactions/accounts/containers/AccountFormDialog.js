import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog';
  
import AccountForm from '../components/AccountForm';

const AccountFormDialog = ({open, onClose, title, fullScreen, onSubmit, isFetching, errors}) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}>

            <DialogTitle>{title}</DialogTitle>

            <AccountForm 
                onSubmit={onSubmit}
                onClose={onClose}
                isFetching={isFetching}
                errors={errors} />

        </Dialog>
    );
};

AccountFormDialog.propTypes = {
    //Modal
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    //Form
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default withMobileDialog()(AccountFormDialog);