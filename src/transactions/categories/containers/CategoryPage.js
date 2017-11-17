import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';

import FloatingActionButton from '../../../common/material/FloatingActionButton';
import CategoryFormDialog from './CategoryFormDialog';
import CategoryTable from '../components/CategoryTable';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { operations } from '../duck';
import { EXPENSE, INCOME } from '../../kinds';

const styles = () => ({
    root: {
      flexGrow: 1,
      marginTop: 30,
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
        // TO DO: change static expense
        this.props.onSubmit(category.name, EXPENSE).then(({result}) => {
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

    handleRefresh = () => this.props.onFetch();

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
                <Grid container spacing={24}>

                    <Grid item xs={12}>
                        <CategoryTable
                            categories={categories}
                            onEdit={this.handleRequestEdit}
                            onDelete={this.handleRequestDelete} />
                    </Grid>

                    <FloatingActionButton color="primary" onClick={this.handleRequestCreate}>
                        <AddIcon />
                    </FloatingActionButton>
                </Grid>

                <CategoryFormDialog
                    open={this.state.openCategoryFormDialog}
                    onRequestClose={this.handleCloseFormDialog}
                    title={this.props.editingCategory.id ? "Editar categoria" : "Criar categoria"}

                    isFetching={isFetching}
                    errors={this.props.errors} 
                    onSubmit={this.handleCategoryFormSubmit} 
                    category={this.props.editingCategory}
                />

                <ConfirmDeleteDialog 
                    open={this.state.openDeleteDialog} 
                    onRequestClose={this.handleCloseDeleteDialog} 
                    onConfirm={this.handleConfirmDelete}
                    error={this.props.errors.detail} >

                    Tem certeza que deseja deletar esta categoria?
                </ConfirmDeleteDialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(operations.fetchCategories(EXPENSE));
            dispatch(operations.fetchCategories(INCOME));
        },
        onSubmit: (name, kind) => dispatch(operations.saveCategory(name, kind)),
        onDelete: (id) => dispatch(operations.deleteCategory(id, EXPENSE)),//TO DO: remove static kind
        onEdit: (id) => dispatch(operations.editCategory(id)),        
        onFinishEdit: () => dispatch(operations.finishEditCategory())
    };
};


export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);