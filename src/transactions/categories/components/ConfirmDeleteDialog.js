import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

const ConfirmDeleteDialog = ({open, onConfirm, onClose, error, children}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar ação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                    {error}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>

                <Button onClick={onConfirm} color="accent">
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