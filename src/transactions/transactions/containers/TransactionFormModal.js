import React from 'react';
import { Modal, Button } from '@sketchpixy/rubix';

import TransactionForm from '../components/TransactionForm';

const TransactionFormModal = ({show, onHide, title, onSubmit, isFetching, errors, transaction}) => {
    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <TransactionForm 
                    onSubmit={onSubmit} 
                    isFetching={isFetching} 
                    transaction={transaction}
                    errors={errors} />
            </Modal.Body>
        </Modal>
    );
}

export default TransactionFormModal;