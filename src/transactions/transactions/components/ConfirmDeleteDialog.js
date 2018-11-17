import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import ConfirmDeleteDialog from '../../../common/material/ConfirmDeleteDialog';
import { types } from '../duck';

// eslint-disable-next-line react/prop-types
const PeriodicActions = ({ onClose, onConfirm }) => (
    <DialogActions>
        <Button onClick={onClose} color="primary">
            Cancelar
            </Button>

        <Button onClick={() => onConfirm(types.DELETE_ALL_PERIODIC_TRANSACTIONS)} color="default">
            Todas
            </Button>

        <Button onClick={() => onConfirm(types.DELETE_THIS_AND_NEXT_TRANSACTIONS)} color="default">
            Esta e futuras
            </Button>

        <Button onClick={() => onConfirm(types.DELETE_TRANSACTION)} color="default">
            Somente esta
            </Button>
    </DialogActions>
);

// eslint-disable-next-line react/prop-types
const RegularActions = ({ onClose, onConfirm }) => (
    <DialogActions>
        <Button onClick={onClose} color="primary">
            Cancelar
            </Button>

        <Button onClick={() => onConfirm(types.DELETE_TRANSACTION)} color="default">
            Confirmar
            </Button>
    </DialogActions>
);

const ConfirmTransactionDeleteDialog = ({ isPeriodic, children, ...props }) => {
    const actions = isPeriodic ? PeriodicActions : RegularActions;

    return (
        <ConfirmDeleteDialog ActionsComponent={actions} {...props}>
            {children}
            {isPeriodic && " Notamos que é uma transação periódica, como deseja deletar?"}
        </ConfirmDeleteDialog>
    );
};

ConfirmTransactionDeleteDialog.propTypes = {
    isPeriodic: PropTypes.bool,
    ...ConfirmDeleteDialog.propTypes
};

export default ConfirmTransactionDeleteDialog;
