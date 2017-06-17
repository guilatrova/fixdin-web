import React from 'react';
import { Modal, Button } from '@sketchpixy/rubix';

import TransactionForm from './TransactionForm';

const TransactionFormModal = ({show, onHide, title, onSubmit, isFetching, transaction, kind}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <TransactionForm 
                    onSubmit={onSubmit} 
                    isFetching={isFetching} 
                    transaction={transaction}
                    kind={kind} />
            </Modal.Body>
        </Modal>
    );
}

export default TransactionFormModal;