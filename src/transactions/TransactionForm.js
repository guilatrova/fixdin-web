import React from 'react';
import { Link } from 'react-router';

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
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 0,
            due_date: new Date(),
            description: '',
            category: '',
            value: 0,
            kind: props.kind,
            details: '',
            periodic: {},
            errors: {},
            periodic_visible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.togglePeriodic = this.togglePeriodic.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    togglePeriodic(e) {
        this.setState({ periodic_visible: !this.state.periodic_visible});
    }
    
    render() {
        return (
        <Form horizontal>
            
            <FormGroup controlId='dueDateGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Vencimento
                </Col>
                <Col sm={10}>
                    <FormControl 
                        autoFocus
                        className='border-focus-blue'
                        onChange={this.handleChange}
                        name="due_date"
                        value={this.state.due_date} />
                </Col>
            </FormGroup>

            <FormGroup controlId='descriptionGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Descrição
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description} />
                </Col>
            </FormGroup>

            <FormGroup controlId='categoryGroup'>
                <Col componentClass={ControlLabel} sm={2}>
                    Categoria
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category} />
                </Col>
            </FormGroup>

            <FormGroup controlId='valueGroup'>

                <Col componentClass={ControlLabel} sm={2}>
                    Valor
                </Col>

                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="value"
                        onChange={this.handleChange}
                        value={this.state.value} />
                </Col>

            </FormGroup>

            <FormGroup controlId='detailsGroup'>

                <Col componentClass={ControlLabel} sm={2}>
                    Detalhes
                </Col>

                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        componentClass='textarea'
                        name="details"
                        onChange={this.handleChange}
                        value={this.state.details} />
                </Col>

            </FormGroup>

            <FormGroup controlId='periodicCheckGroup'>
                <Col smOffset={2} sm={10}>
                    <Checkbox onChange={this.togglePeriodic} checked={this.state.periodic_visible}>
                        Periódico
                    </Checkbox>
                </Col>
            </FormGroup>

            <FormGroup controlId='periodicGroup'>
            </FormGroup>

            </Form>
        );
    }
}

export default TransactionForm;