import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import AccountForm from '../components/AccountForm';

const AccountFormDialog = ({open, onClose, title, fullScreen, ...other}) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}>

            <DialogTitle>{title}</DialogTitle>

            <AccountForm 
                onClose={onClose}
                {...other}
            />

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