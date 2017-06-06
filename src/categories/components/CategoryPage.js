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
import { saveCategory } from './../actions';

class CategoryPage extends React.Component {
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

                                        <CategoryForm 
                                            onSubmit={this.props.onSubmit} 
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
    const { isFetching, errors } = state.categories;
    return {
        isFetching,
        errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, kind) => dispatch(saveCategory(name, kind))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);