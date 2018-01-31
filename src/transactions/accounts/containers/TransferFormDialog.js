import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog, {
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
  
import TransferForm from '../components/TransferForm';

const styles = {
    content: {
        overflowY: 'visible'
    },
    paper: {
        overflow: 'visible'
    }
};

const TransferFormDialog = ({open, onClose, title, fullScreen, classes, ...other}) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            classes={{ paper: classes.paper, }}>

            <DialogTitle>{title}</DialogTitle>

            <TransferForm 
                onClose={onClose}
                classes={classes}
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