import React, { PropTypes } from 'react';

import Select from 'react-select';
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
import { EXPENSE, INCOME } from './../../kinds';

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.category.id,
            name: this.props.category.name,
            kind: this.props.category.kind
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectChange(value) {
        this.setState({ kind: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.id, this.state.name, this.state.kind);
    }

    render() {
        const { errors } = this.props;
        const options = [
            { value: EXPENSE.id, label: EXPENSE.text },
            { value: INCOME.id, label: INCOME.text }
        ]

        let disabled = true;
        if (!this.props.isFetching && this.state.kind && this.state.name) {
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
                
                <HorizontalFormGroupError id="kind" label="Para" error={errors.kind}>
                    <Select name="kind"
                            value={this.state.kind}
                            options={options}
                            onChange={this.handleSelectChange}
                            placeholder="Escolher..."
                            noResultsText="Nada encontrado"
                            openOnFocus={true} />
                </HorizontalFormGroupError>                

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
        name: '',
        kind: EXPENSE.id
    }
}

export default CategoryForm;