import React from 'react';
import { Modal, Button } from '@sketchpixy/rubix';

const ConfirmDeleteTransactionModal = ({show, onHide, onConfirmDelete}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar deletar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Você tem certeza que deseja deletar esta transação?
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide}>Cancelar</Button>
                <Button bsStyle='danger' onClick={onConfirmDelete}>Deletar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeleteTransactionModal;