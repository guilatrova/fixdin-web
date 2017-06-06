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
import { saveCategory, fetchCategories } from './../actions';

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showCategoryFormModal: false
        }

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        this.props.fetch(this.props.route.kind);

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCreateCategory = this.handleCreateCategory.bind(this);
        this.handleHideFormModal = this.handleHideFormModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Necessary because DidMount isn't called again when we change between Incomes and Expenses
        if (this.props.route.kind != nextProps.route.kind) {
            this.props.fetch(nextProps.route.kind);
        }
    }

    handleCreateCategory() {
        this.setState({ showCategoryFormModal: true });
    }

    handleHideFormModal() {
        this.setState({ showCategoryFormModal: false });
    }

    handleRefresh() {
        this.props.fetch(this.props.route.kind);
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
                                            categories={categories} />
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>

                <CategoryFormModal
                    show={this.state.showCategoryFormModal}
                    onHide={this.handleHideFormModal}
                    title="Criar categoria"

                    isFetching={isFetching}
                    errors={this.props.errors} 
                    onSubmit={this.props.onCategoryFormSubmit} 
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { isFetching, errors, categories } = state.categories;
    return {
        isFetching,
        errors,
        categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (kind) => dispatch(fetchCategories(kind)),
        onCategoryFormSubmit: (name, kind) => dispatch(saveCategory(name, kind))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);