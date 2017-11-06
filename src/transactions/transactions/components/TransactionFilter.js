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

    constructor(props) {
        super(props);
        const curDate = new Date();
        const startMonth = moment([curDate.getFullYear(), curDate.getMonth()]);
        const endMonth = moment().endOf('month');

        this.state = {
            payed: -1,
            kind: props.kind,
            due_date_from: startMonth.format('YYYY-MM-DD'),
            due_date_until: endMonth.format('YYYY-MM-DD'),
            raw: {
                multi_category: [],
                due_date_from: startMonth,
                due_date_until: endMonth
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleKindChange = this.handleKindChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDateOnBlur = this.handleDateOnBlur.bind(this);
    }

    handleDateChange(id, value) {
        if (moment.isMoment(value)) {
            this.setState({ 
                [id]: value.format('YYYY-MM-DD'),
                raw: {
                    ...this.state.raw,
                    [id]: value
                }
            });
        }
    }

    handleCategoryChange(categories) {
        const raw = this.state.raw;

        this.setState({
            category: categories.join(),
            raw: {
                ...raw,
                multi_category: categories
            }
         })
    }

    handleKindChange(kind) {
        const raw = this.state.raw;
        const val = kind ? kind.value : ALL;

        this.setState({
            kind: val,
            raw: {
                ...raw,
                kind
            }
         })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        const { raw, ...other } = this.state;
        this.props.onFilter(other);
    }

    handleClear(e) {
        this.setState({
            payed: -1,
            category: "",
            description: "",
            deadline: "",
            priority: "",
            kind: this.props.kind,
            raw: {
                multi_category: []                
            }
        })
        this.props.onFilter();
    }

    handleDateOnBlur(id, value) {
        const now = moment();        
        if (!moment.isMoment(value)) {
            this.setState({ 
                [id]: now.format('YYYY-MM-DD'),
                raw: {
                    ...this.state.raw,
                    [id]: now
                }
            });
        }
    }

    render() {
        const { kind, transactions } = this.props;
        const kindOptions = [ 
            { value: ALL, label: '-' },
            { value: INCOME, label: 'Receitas' },
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
                            value={this.state.raw.kind}
                            onChange={this.handleKindChange}
                            options={kindOptions}
                        />
                    </FormGroup>

                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup controlId="description-filter">
                        <ControlLabel>Descrição</ControlLabel>
                        
                        <TransactionDescription
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            maxLength="120"
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6}>
                    <DateInterval 
                        id="due_date"
                        value_from={this.state.raw.due_date_from}
                        value_until={this.state.raw.due_date_until}
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
                            kind={this.props.kind}
                            value={this.state.raw.multi_category}
                            onChange={this.handleCategoryChange} />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup controlId="payed-filter">
                        <ControlLabel>Pago?</ControlLabel>
                        
                        <FormControl name="payed" componentClass="select" value={this.state.payed} onChange={this.handleChange}>
                            <option value="-1">-</option>
                            <option value="0">NÃO</option>
                            <option value="1">SIM</option>
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
            
            <Row>
                {this.state.payed == 1 && 
                <Col xs={12} md={6}>
                    <DateInterval 
                        id="payment_date"
                        value_from={this.state.raw.payment_date_from}
                        value_until={this.state.raw.payment_date_until}
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
                            value={this.state.priority} 
                            onChange={this.handleChange}
                            source={prioritySource} />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <FormGroup>
                        <ControlLabel>Prazo</ControlLabel>
                        
                        <Autocomplete 
                            name="deadline" 
                            value={this.state.deadline} 
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

}

const mapDispatchToProps = (dispatch) => {

}

export default TransactionFilter;