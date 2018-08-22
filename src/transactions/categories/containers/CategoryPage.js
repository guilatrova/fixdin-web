import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CategoryFormDialogContainer from './CategoryFormDialogContainer';
import CategoryTable from './CategoryTableContainer';
import ConfirmDeleteDialog from '../../../common/material/ConfirmDeleteDialog';
import { operations, selectors } from '../duck';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        overflow: 'auto',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    }
});

class CategoryPage extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,

        onFetch: PropTypes.func.isRequired,
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
        this.props.onDelete(this.state.toDeleteId).then(({ result }) => {
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Paper className={classes.paper}>
                    <CategoryTable
                        onAdd={this.handleRequestCreate}
                        onRefresh={this.handleRefresh}
                        onEdit={this.handleRequestEdit}
                        onDelete={this.handleRequestDelete} />
                </Paper>

                <CategoryFormDialogContainer
                    open={this.state.openCategoryFormDialog}
                    onClose={this.handleCloseFormDialog}
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
    errors: selectors.getErrors(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(operations.fetchCategories()),
        onDelete: (id) => dispatch(operations.deleteCategory(id)),
        onEdit: (id) => dispatch(operations.editCategory(id)),
        onFinishEdit: () => dispatch(operations.finishEditCategory())
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
