import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import TransferForm from '../components/TransferForm';

const styles = {
    paperScrollPaper: {
        flex: '0 1 auto',
        maxHeight: 350,
        overflowY: 'visible'
    }
};

const TransferFormDialog = ({ open, onClose, title, fullScreen, classes, ...other }) => {
    const regularDialog = !fullScreen;
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            classes={regularDialog ? classes : undefined}>

            <DialogTitle className="arrow-parent">{title}</DialogTitle>

            <TransferForm
                onClose={onClose}
                {...other}
            />

        </Dialog>
    );
};

TransferFormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
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

export default withMobileDialog()(
    withStyles(styles)(TransferFormDialog)
);
