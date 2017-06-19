import React, { PropTypes } from 'react';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Checkbox,
  Button,
  HelpBlock,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import HorizontalFormGroupError from './../../../common/components/forms/HorizontalFormGroupError';

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.category
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectChange({value}) {        
        this.setState({ kind: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const { errors } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            disabled = false;
        }

        return (
            <Form horizontal onSubmit={this.handleSubmit}>

                <HorizontalFormGroupError 
                    id="name"
                    label="Nome" 
                    error={errors.name}
                    value={this.state.name}
                    onChange={this.handleChange}
                />                     

                <FormGroup>
                    <Col smOffset={2} sm={10} className='text-right'>
                        <Button lg type='submit' bsStyle='primary' disabled={disabled}>Salvar</Button>
                    </Col>
                </FormGroup>

            </Form>
        );
    }
}

CategoryForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired
}

CategoryForm.defaultProps = {
    errors: {},
    category: {
        id: 0,
        name: ''
    }
}

export default CategoryForm;