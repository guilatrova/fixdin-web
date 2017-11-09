import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Select from 'react-select';
import TransactionDescription from './TransactionDescription';
import MultiCategorySelectPicker from './../../categories/components/MultiCategorySelectPicker';
import DatetimeInput from 'react-datetime';
import { EXPENSE, INCOME, ALL } from './../../kinds';
import Autocomplete from '../../../common/components/FixedAutocomplete';
import { selectors, operations } from '../duck';

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
  SplitHoverButton,
  MenuItem,
  HelpBlock,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

const DateInterval = ({id, children, value_from, value_until, onChange, onBlur}) => {
    const noPaddingLeft = { paddingLeft: 0};
    const noPaddingRight = { paddingRight: 0};
    const idFrom = `${id}_from`;
    const idUntil = `${id}_until`;

    return (
        <div>
            <Col xs={12} md={6} style={noPaddingLeft}>
                <FormGroup controlId={idFrom}>
                    <ControlLabel>{children} de</ControlLabel>
                    
                    <DatetimeInput
                        timeFormat={false}
                        onChange={(value) => onChange(idFrom, value)}
                        onBlur={(value) => onBlur(idFrom, value)}
                        value={value_from}
                        closeOnSelect={true}
                        closeOnTab={true} />
                </FormGroup>
            </Col>

            <Col xs={12} md={6} style={noPaddingRight}>
                <FormGroup controlId={idUntil}>
                    <ControlLabel>{children} até</ControlLabel>
                    
                    <DatetimeInput
                        timeFormat={false}
                        onChange={(value) => onChange(idUntil, value)}
                        onBlur={(value) => onBlur(idUntil, value)}
                        value={value_until}
                        closeOnSelect={true}
                        closeOnTab={true} />
                </FormGroup>
            </Col>
        </div>
    );
}

class TransactionFilter extends React.Component {
    static propTypes = {
        onFilter: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,        
        transactions: PropTypes.array.isRequired,
    }

    static defaultProps = {
        filters: {
            payed: -1,
            due_date_from: moment().startOf('month'),
            due_date_until: moment().endOf('month'),
            category: [],
        }
    }

    setFilters = (newFilters) => {
        this.props.onSetFilter({
            ...this.props.filters,
            ...newFilters
        });
    }

    handleChange = (e) => 
        this.setFilters({ [e.target.name]: e.target.value });    

    handleClear = (e) => this.props.onClear();    

    handleSubmit = (e) => {
        //this.props.onFilter(other);
    }

    handleDateChange = (id, value) => {
        if (moment.isMoment(value)) {
            this.setFilters({ [id]: value });
        }
    }

    handleDateOnBlur = (id, value) => {
        if (!moment.isMoment(value)) {
            this.setFilters({ [id]: moment() });
        }
    }

    render() {
        const { kind, transactions, filters } = this.props;
        const kindOptions = [ 
            { value: ALL, label: '-' },
            { value: INCOME,  label: 'Receitas' },
            { value: EXPENSE, label: 'Despesas' }
        ];
        const prioritySource = transactions.map(transaction => transaction.priority.toString());
        const deadlineSource = transactions.map(transaction => transaction.deadline.toString());        

        return (
            <div>
            <Row>
                
                <Col xs={12} md={6} lg={3}>
                    <FormGroup controlId="kind-filter">
                        <ControlLabel>Tipo</ControlLabel>
                        
                        <Select 
                            placeholder="Tipo"
                            value={filters.kind}
                            onChange={(kind) => this.setFilters({ kind })}
                            options={kindOptions}
                        />
                    </FormGroup>

                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup controlId="description-filter">
                        <ControlLabel>Descrição</ControlLabel>
                        
                        <TransactionDescription
                            name="description"
                            value={filters.description}
                            onChange={this.handleChange}
                            maxLength="120"
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <DateInterval 
                        id="due_date"
                        value_from={filters.due_date_from}
                        value_until={filters.due_date_until}
                        onChange={this.handleDateChange}
                        onBlur={this.handleDateOnBlur}
                    >
                        Vencimento
                    </DateInterval>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <FormGroup controlId="category-filter">
                        <ControlLabel>Categorias</ControlLabel>
                        
                        <MultiCategorySelectPicker 
                            kind={filters.kind}
                            value={filters.category}
                            onChange={(category) => this.setFilters({ category })} />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup controlId="payed-filter">
                        <ControlLabel>Pago?</ControlLabel>
                        
                        <FormControl name="payed" componentClass="select" value={filters.payed} onChange={this.handleChange}>
                            <option value="-1">-</option>
                            <option value="0">NÃO</option>
                            <option value="1">SIM</option>
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
            
            <Row>
                {filters.payed == 1 && 
                <Col xs={12} md={6}>
                    <DateInterval 
                        id="payment_date"
                        value_from={filters.payment_date_from}
                        value_until={filters.payment_date_until}
                        onChange={this.handleDateChange}
                        onBlur={this.handleDateOnBlur}
                    >
                        Pagamento
                    </DateInterval>
                </Col>}

                <Col xs={12} md={6} lg={3}>
                    <FormGroup>
                        <ControlLabel>Prioridade</ControlLabel>
                        
                        <Autocomplete 
                            name="priority" 
                            value={filters.priority} 
                            onChange={this.handleChange}
                            source={prioritySource} />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup>
                        <ControlLabel>Prazo</ControlLabel>
                        
                        <Autocomplete 
                            name="deadline" 
                            value={filters.deadline} 
                            onChange={this.handleChange}
                            source={deadlineSource} />                        
                    </FormGroup>
                </Col>

            </Row>

            <Row>
                <Col xs={3}>
                    <Button onClick={this.handleSubmit} disabled={this.props.isFetching}>Filtrar</Button>
                    <Button onClick={this.handleClear}>Limpar</Button>
                </Col>
            </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const filters = selectors.getFilters(state);
    let isEmpty = true;
    for (var key in filters) {
        if (hasOwnProperty.call(filters, key)) {
            isEmpty = false;
            break;
        };
    }

    return {
        filters: isEmpty ? undefined : filters
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetFilter: (filters) => dispatch(operations.setFilters(filters)),
        onFilter: () => dispatch(operations.filterTransactions()),
        onClear: () => dispatch(operations.clearFilters())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFilter);