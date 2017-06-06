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

import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { saveCategory, fetchCategories } from './../actions';

class CategoryPage extends React.Component {

    componentDidMount() {
        this.props.fetch(this.props.route.kind);

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Necessary because DidMount isn't called again when we change between Incomes and Expenses
        if (this.props.route.kind != nextProps.route.kind) {
            this.props.fetch(nextProps.route.kind);
        }
    }

    handleRefresh() {
        this.props.fetch(this.props.route.kind);
    }

    render() {
        return (
            <div className="category-page">
                <h1>categoria</h1>

                <PanelContainer controls={false}>
                    <Panel>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <CategoryList
                                            categories={this.props.categories} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>

                                        <CategoryForm 
                                            onSubmit={this.props.onCategoryFormSubmit} 
                                            errors={this.props.errors} 
                                            isFetching={this.props.isFetching} />

                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
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