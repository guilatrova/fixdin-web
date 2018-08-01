import React from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryFormDialog from '../components/CategoryFormDialog';
import { operations, selectors } from '../duck';

class CategoryFormDialogContainer extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,

        open: PropTypes.bool.isRequired,
        editingCategory: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired
    }

    handleCategoryFormSubmit = (category) => {
        this.props.onSubmit(category).then(({result}) => {
            if (result == 'success') {
                this.props.onClose();
            }
        });
    }

    render() {
        const { open, onClose, editingCategory, isFetching, errors } = this.props;
        return (
            <CategoryFormDialog
                onSubmit={this.handleCategoryFormSubmit}
                open={open}
                onClose={onClose}
                title={editingCategory.id ? "Editar categoria" : "Criar categoria"}
                isFetching={isFetching}
                errors={errors}
                category={editingCategory}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (category) => dispatch(operations.saveCategory(category)),
});

const mapStateToProps = (state) => ({
    editingCategory: selectors.getEditingCategory(state),
    errors: selectors.getErrors(state),
    isFetching: selectors.isFetching(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormDialogContainer);
