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

import { EXPENSE, INCOME } from './../kinds';

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            kind: EXPENSE.id
        }
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectChange(value) {
        this.setState({ kind: value });
    }

    render() {
        const options = [
            { value: EXPENSE.id, label: EXPENSE.text },
            { value: INCOME.id, label: INCOME.text }
        ]

        return (
            <Form horizontal>

                <FormGroup controlId='nameGroup'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Nome
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            className='border-focus-blue'
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='kindGroup'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Para
                    </Col>
                    <Col sm={10}>
                        <Select
                            name="select-kind"
                            value={this.state.kind}
                            options={options}
                            onChange={this.handleSelectChange} />
                    </Col>
                </FormGroup>

            </Form>
        );
    }
}

export default CategoryForm;