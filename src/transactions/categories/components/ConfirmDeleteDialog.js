import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

const ConfirmDeleteDialog = ({open, onConfirm, onRequestClose, error}) => {
    return (
        <Dialog open={open} onRequestClose={onRequestClose}>
            <DialogTitle>Confirmar ação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.props.children}
                    {error}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
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
    onRequestClose: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default ConfirmDeleteDialog;