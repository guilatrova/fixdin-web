import React from 'react';
import { Modal, Button } from '@sketchpixy/rubix';

const ConfirmDeleteModal = ({children, show, onHide, onConfirmDelete}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar deletar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide}>Cancelar</Button>
                <Button bsStyle='danger' onClick={onConfirmDelete}>Deletar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeleteModal;