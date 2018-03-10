import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import TypographyError from '../../../common/material/TypographyError';
import { types } from '../duck';

const periodicActions = (onCancel, onConfirm) => {
    return (
        <DialogActions>
            <Button onClick={onCancel} color="primary">
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
};

const regularActions = (onCancel, onConfirm) => {
    return (
        <DialogActions>
            <Button onClick={onCancel} color="primary">
                Cancelar
            </Button>

            <Button onClick={() => onConfirm(types.DELETE_TRANSACTION)} color="default">
                Confirmar
            </Button>
        </DialogActions>
    );
};

export default class ConfirmDeleteDialog extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onConfirm: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        isPeriodic: PropTypes.bool,
        error: PropTypes.string,
        children: PropTypes.node.isRequired
    }

    static defaultProps = {
        isPeriodic: false
    }

    render() {
        const actions = this.props.isPeriodic ? periodicActions : regularActions;
        const periodicText = this.props.isPeriodic ? "Notamos que é uma transação periódica, como deseja deletar?" : "";

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Confirmar ação</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        <TypographyError>
                            {this.props.error}
                        </TypographyError>

                        {this.props.children}
                        {" "}{periodicText}
                    </DialogContentText>

                </DialogContent>

                {actions(this.props.onClose, this.props.onConfirm)}
            </Dialog>
        );
    }
}