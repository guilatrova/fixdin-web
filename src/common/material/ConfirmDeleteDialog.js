import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TypographyError from './TypographyError';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDeleteDialog = ({open, onConfirm, onClose, error, children}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar ação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>

                <TypographyError>
                    {error}
                </TypographyError>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>

                <Button onClick={onConfirm} color="default">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );    
};

ConfirmDeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.string,
    children: PropTypes.node,
};

export default ConfirmDeleteDialog;