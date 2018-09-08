import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TypographyError from './TypographyError';
import PrimaryButton from '../components/PrimaryButton';
import CancelButton from '../components/CancelButton';

const styles = {
    content: {
        padding: 20
    }
};

const ConfirmDeleteDialog = ({ open, onConfirm, onClose, error, children, classes }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="arrow-parent">Confirmar ação</DialogTitle>

            <DialogContent className={classes.content}>
                <DialogContentText>
                    {children}
                </DialogContentText>

                <TypographyError>
                    {error}
                </TypographyError>
            </DialogContent>

            <DialogActions>
                <CancelButton onClick={onClose} />

                <PrimaryButton onClick={onConfirm}>Confirmar</PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.string,
    children: PropTypes.node,
};

export default withStyles(styles)(ConfirmDeleteDialog);
