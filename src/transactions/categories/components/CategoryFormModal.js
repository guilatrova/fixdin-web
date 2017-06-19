import React from 'react';
import { Modal, Button } from '@sketchpixy/rubix';

import CategoryForm from './CategoryForm';

const CategoryFormModal = ({show, onHide, title, onSubmit, isFetching, errors, category}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CategoryForm 
                    onSubmit={onSubmit} 
                    isFetching={isFetching}
                    category={category}
                    errors={errors} />
            </Modal.Body>
        </Modal>
    );
}

export default CategoryFormModal;