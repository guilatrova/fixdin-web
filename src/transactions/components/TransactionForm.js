import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

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

import { createTransaction } from '../actions';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 0,
            due_date: moment(new Date()),
            description: '',
            category: '',
            value: '0,00',
            kind: props.kind,
            details: '',
            periodic: {},
            errors: {},
            periodic_visible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePeriodic = this.togglePeriodic.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDueDateChange(value) {
        this.setState({ due_date: value });
    }

    handleValueChange(value) {
        this.setState({ value: value });
    }

    togglePeriodic(e) {
        this.setState({ periodic_visible: !this.state.periodic_visible});
    }

    isSubmitDisabled() {
        let disabled = false;
        if (this.props.isFetching) {
            disabled = true;
        }       
        else if (this.state.value == '' || this.state.value == undefined) { //0 is enabled
            disabled = true;
        }
        else {
            disabled = !(this.state.due_date && this.state.category && this.state.description);
        }

        return disabled;
    }
    
    render() {
        const { errors } = this.props;
        const disabled = this.isSubmitDisabled();

        return (
        <Form horizontal onSubmit={this.handleSubmit}>
            
            <FormGroup controlId='dueDateGroup' validationState={'due_date' in errors ? 'error' : undefined}>
                <Col componentClass={ControlLabel} sm={2}>
                    Vencimento
                </Col>
                <Col sm={10}>
                    <DatetimeInput
                        timeFormat={false}
                        className='border-focus-blue'
                        onChange={this.handleDueDateChange}                        
                        value={this.state.due_date} />

                    {errors.due_date &&
                        <HelpBlock>{errors.due_date}</HelpBlock>
                    }
                </Col>
            </FormGroup>

            <FormGroup controlId='descriptionGroup' validationState={'description' in errors ? 'error' : undefined}>
                <Col componentClass={ControlLabel} sm={2}>
                    Descrição
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description} />
                    
                    {errors.description &&
                        <HelpBlock>{errors.description}</HelpBlock>
                    }
                </Col>
            </FormGroup>

            <FormGroup controlId='categoryGroup' validationState={'category' in errors ? 'error' : undefined}>
                <Col componentClass={ControlLabel} sm={2}>
                    Categoria
                </Col>
                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category} />

                    {errors.category &&
                        <HelpBlock>{errors.category}</HelpBlock>
                    }
                </Col>
            </FormGroup>

            <FormGroup controlId='valueGroup' validationState={'value' in errors ? 'error' : undefined}>

                <Col componentClass={ControlLabel} sm={2}>
                    Valor
                </Col>

                <Col sm={10}>
                    <CurrencyInput 
                        className='border-focus-blue form-control'
                        onChange={this.handleValueChange}
                        value={this.state.value}
                        prefix="R$ "
                        decimalSeparator=","
                        thousandSeparator="." />

                    {errors.value &&
                        <HelpBlock>{errors.value}</HelpBlock>
                    }
                </Col>

            </FormGroup>

            <FormGroup controlId='deadlineGroup' validationState={'deadline_count' in errors ? 'error' : undefined}>

                <Col componentClass={ControlLabel} sm={2}>
                    Prazo
                </Col>

                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="deadline_count"
                        onChange={this.handleChange}
                        value={this.state.description} />
                    
                    {errors.deadline_count &&
                        <HelpBlock>{errors.deadline_count}</HelpBlock>
                    }
                </Col>

            </FormGroup>

            <FormGroup controlId='priorityGroup' validationState={'priority_level' in errors ? 'error' : undefined}>

                <Col componentClass={ControlLabel} sm={2}>
                    Prazo
                </Col>

                <Col sm={10}>
                    <FormControl
                        className='border-focus-blue'
                        name="priority_level"
                        onChange={this.handleChange}
                        value={this.state.description} />
                    
                    {errors.priority_level &&
                        <HelpBlock>{errors.priority_level}</HelpBlock>
                    }
                </Col>

            </FormGroup>

            <FormGroup controlId='detailsGroup' validationState={'details' in errors ? 'error' : undefined}>

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

                    {errors.details &&
                        <HelpBlock>{errors.details}</HelpBlock>
                    }
                </Col>

            </FormGroup>

            {/*<FormGroup controlId='periodicCheckGroup'>
                <Col smOffset={2} sm={10}>
                    <Checkbox onChange={this.togglePeriodic} checked={this.state.periodic_visible}>
                        Periódico
                    </Checkbox>
                </Col>
            </FormGroup>

            <FormGroup controlId='periodicGroup'>
            </FormGroup>*/}

            <FormGroup>
                <Col smOffset={2} sm={10} className='text-right'>
                    <Button lg type='submit' bsStyle='primary' disabled={disabled}>Criar</Button>
                </Col>
            </FormGroup>

            </Form>
        );
    }
}

TransactionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    kind: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
}

TransactionForm.defaultProps = {
    errors: { }
}

export default TransactionForm;

// const mapStateToProps = (state) => {    
//     return {
//         ...state.transactions.form
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSubmit: (transactionData) => {
//             dispatch(createTransaction(transactionData))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);