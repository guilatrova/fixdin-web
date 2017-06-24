import React from 'react';
import { connect } from 'react-redux';

import {    
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Modal,
  Panel,
  PanelContainer,  
  Checkbox,
  Table,
  Button,
  ButtonGroup,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import CategoryList from './CategoryList';
import CategoryFormModal from './CategoryFormModal';
import ConfirmDeleteModal from './../../../common/components/modals/ConfirmDeleteModal';
import { 
    saveCategory, 
    fetchCategories, 
    editCategory, 
    finishEditCategory, 
    deleteCategory
} from './../actions';

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showCategoryFormModal: false,
            showCategoryDeleteModal: false,
            toDeleteId: undefined
        }

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCategoryFormSubmit = this.handleCategoryFormSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    }

    componentDidMount() {
        this.props.fetch(this.props.route.kind);

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCreateCategory = this.handleCreateCategory.bind(this);
        this.handleHideFormModal = this.handleHideFormModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);        
    }

    componentWillReceiveProps(nextProps) {
        //Necessary because DidMount isn't called again when we change between Incomes and Expenses
        if (this.props.route.kind != nextProps.route.kind) {
            this.props.fetch(nextProps.route.kind);
        }
    }

    handleCategoryFormSubmit(category) {
        const { kind } = this.props.route;
        this.props.onSubmit({...category, kind}).then(({result}) => {
            if (result == 'success') {
                this.setState({ showCategoryFormModal: false });
                this.props.onFinishEdit();
            }
        });
    }

    handleCreateCategory() {
        this.setState({ showCategoryFormModal: true });
    }

    handleHideFormModal() {
        this.props.onFinishEdit();
        this.setState({ showCategoryFormModal: false });
    }

    handleRefresh() {
        this.props.fetch(this.props.route.kind);
    }

    handleEdit(id) {
        this.setState({ showCategoryFormModal: true });
        this.props.onEdit(id);
    }

    handleDelete(id) {
        this.setState({
            showCategoryDeleteModal: true,
            toDeleteId: id
        })
    }

    handleConfirmDelete() {
        const {kind} = this.props.route;
        this.props.onDelete(this.state.toDeleteId, kind).then(({result}) => {
            if (result == 'success') {
                this.setState({
                    showCategoryDeleteModal: false,
                    toDeleteId: undefined
                })
            }
        });
    }

    handleHideDeleteModal() {
        this.props.onFinishEdit();
        this.setState({
            showCategoryDeleteModal: false,
            toDeleteId: undefined
        })
    }

    render() {
        const { isFetching } = this.props;
        const { kind } = this.props.route;
        const categories = this.props.categories.filter(category => category.kind === kind.id);

        return (
            <div className="category-page">
                <h1>categoria</h1>

                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <ButtonGroup>
                                            <Button bsStyle='primary' onClick={this.handleCreateCategory}>Nova</Button>
                                            <Button bsStyle='blue' onClick={this.handleRefresh} disabled={isFetching}>Atualizar</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12}>
                                        <CategoryList
                                            categories={categories}
                                            onEdit={this.handleEdit}
                                            onDelete={this.handleDelete} />
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <CategoryFormModal
                    show={this.state.showCategoryFormModal}
                    onHide={this.handleHideFormModal}
                    title={this.props.editingCategory.id ? "Editar categoria" : "Criar categoria"}

                    isFetching={isFetching}
                    errors={this.props.errors} 
                    onSubmit={this.handleCategoryFormSubmit} 
                    category={this.props.editingCategory}
                />

                <ConfirmDeleteModal 
                    show={this.state.showCategoryDeleteModal} 
                    onHide={this.handleHideDeleteModal} 
                    onConfirmDelete={this.handleConfirmDelete}
                    error={this.props.errors['detail']} >

                    Tem certeza que deseja deletar esta categoria?
                </ConfirmDeleteModal>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (kind) => dispatch(fetchCategories(kind)),
        onSubmit: (name, kind) => dispatch(saveCategory(name, kind)),
        onDelete: (id, kind) => dispatch(deleteCategory(id, kind)),
        onEdit: (id) => dispatch(editCategory(id)),        
        onFinishEdit: () => dispatch(finishEditCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);