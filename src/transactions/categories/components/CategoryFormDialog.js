import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import CategoryForm from '../components/CategoryForm';

const CategoryFormDialog = ({ open, onClose, title, fullScreen, onSubmit, isFetching, category, errors }) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}>

            <DialogTitle className="arrow-parent">{title}</DialogTitle>

            <CategoryForm
                onSubmit={onSubmit}
                onCancel={onClose}
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
