import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

import FloatingActionButton from '../../../common/material/FloatingActionButton';
import CategoryFormDialog from './CategoryFormDialog';
import CategoryTable from '../components/CategoryTable';
import ConfirmDeleteDialog from '../../../common/material/ConfirmDeleteDialog';
import { operations, selectors } from '../duck';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
      overflowX: 'auto',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    }
});

class CategoryPage extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        errors: PropTypes.object.isRequired,
        editingCategory: PropTypes.object,

        onFetch: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onFinishEdit: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    state = {
        openCategoryFormDialog: false,
        openDeleteDialog: false,
        toDeleteId: undefined
    };

    componentDidMount() {
        this.props.onFetch();    
    }

    handleCategoryFormSubmit = (category) => {
        this.props.onSubmit(category).then(({result}) => {
            if (result == 'success') {
                this.setState({ openCategoryFormDialog: false });
                this.props.onFinishEdit();
            }
        });
    }

    handleRequestCreate = () => this.setState({ openCategoryFormDialog: true });

    handleCloseFormDialog = () => {
        this.props.onFinishEdit();
        this.setState({ openCategoryFormDialog: false });
    }

    handleRefresh = () => this.props.onFetch(0);

    handleRequestEdit = (id) => {
        this.setState({ openCategoryFormDialog: true });
        this.props.onEdit(id);
    }

    handleRequestDelete = (toDeleteId) => {
        this.setState({
            openDeleteDialog: true,
            toDeleteId
        });
    }

    handleConfirmDelete = () => {        
        this.props.onDelete(this.state.toDeleteId).then(({result}) => {
            if (result == 'success') {
                this.setState({
                    openDeleteDialog: false,
                    toDeleteId: undefined
                });
            }
        });
    }

    handleCloseDeleteDialog = () => {
        this.props.onFinishEdit();
        this.setState({
            openDeleteDialog: false,
            toDeleteId: undefined
        });
    }

    render() {
        const { isFetching, classes, categories } = this.props;

        return (
            <div className={classes.root}>
                <Paper>

                    <div className={classes.table}>
                        <CategoryTable
                            categories={categories}
                            onEdit={this.handleRequestEdit}
                            onDelete={this.handleRequestDelete} />
                    </div>

                    <FloatingActionButton color="primary" onClick={this.handleRequestCreate}>
                        <AddIcon />
                    </FloatingActionButton>
                </Paper>

                <CategoryFormDialog
                    open={this.state.openCategoryFormDialog}
                    onClose={this.handleCloseFormDialog}
                    title={this.props.editingCategory.id ? "Editar categoria" : "Criar categoria"}

                    isFetching={isFetching}
                    errors={this.props.errors} 
                    onSubmit={this.handleCategoryFormSubmit} 
                    category={this.props.editingCategory}
                />

                <ConfirmDeleteDialog 
                    open={this.state.openDeleteDialog} 
                    onClose={this.handleCloseDeleteDialog} 
                    onConfirm={this.handleConfirmDelete}
                    error={this.props.errors.detail} >

                    Tem certeza que deseja deletar esta categoria?
                </ConfirmDeleteDialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: selectors.getCategories(state),
    editingCategory: selectors.getEditingCategory(state),
    errors: selectors.getErrors(state),
    isFetching: selectors.isFetching(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(operations.fetchCategories()),
        onSubmit: (category) => dispatch(operations.saveCategory(category)),
        onDelete: (id) => dispatch(operations.deleteCategory(id)),
        onEdit: (id) => dispatch(operations.editCategory(id)),
        onFinishEdit: () => dispatch(operations.finishEditCategory())
    };
};


export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);