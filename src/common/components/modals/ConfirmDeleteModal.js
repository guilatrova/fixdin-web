import React from 'react';
import { Modal, Button, Alert } from '@sketchpixy/rubix';

const ConfirmDeleteModal = ({children, show, onHide, onConfirmDelete, error}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar deletar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && 
                    <Alert danger>
                        <h4>Não foi possível deletar</h4>
                        {error}
                    </Alert>
                    }
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