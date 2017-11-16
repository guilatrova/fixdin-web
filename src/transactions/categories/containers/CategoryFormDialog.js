import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog';
  
import CategoryForm from '../components/CategoryForm';

const CategoryFormDialog = ({open, onClose, title, fullScreen, onSubmit, isFetching, category, errors}) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onRequestClose={onClose}>

            <DialogTitle>{title}</DialogTitle>

            <CategoryForm 
                    onSubmit={onSubmit} 
                    isFetching={isFetching}
                    category={category}
                    errors={errors} />

        </Dialog>
    );
};

CategoryFormDialog.propTypes = {
    //Modal
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    //CategoryForm
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired
};

export default withMobileDialog()(CategoryFormDialog);