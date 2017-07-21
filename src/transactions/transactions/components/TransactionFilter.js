import React from 'react';
import PropTypes from 'prop-types';

import TransactionDescription from './TransactionDescription';
import MultiCategorySelectPicker from './../../categories/components/MultiCategorySelectPicker';
import DatetimeInput from 'react-datetime';

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

const DateInterval = ({id, children, value_from, value_until, onChange}) => {
    return (
        <div>
            <FormGroup controlId={`${id}_from-filter`}>
                <ControlLabel>{children} de</ControlLabel>
                {' '}
                <DatetimeInput
                    timeFormat={false}
                    onChange={(value) => onChange(`${id}_from`, value)}
                    value={value_from}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </FormGroup>

            {' '}

            <FormGroup controlId={`${id}_until-filter`}>
                <ControlLabel>{children} até</ControlLabel>
                {' '}
                <DatetimeInput
                    timeFormat={false}
                    onChange={(value) => onChange(`${id}_until`, value)}
                    value={value_until}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </FormGroup>
        </div>
    );
}

class TransactionFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payed: -1,
            raw: {
                multi_category: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleDateChange(id, value) {
        this.setState({ 
            [id]: value.format('YYYY-MM-DD'),
            raw: {
                ...this.state.raw,
                [id]: value
            }
        });
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

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick(e) {
        const { raw, ...other } = this.state;
        this.props.onFilter(other);
    }

    handleClear(e) {
        this.setState({
            payed: -1,
            category: undefined,
            description: undefined,
            raw: {
                multi_category: []
            }
        })
        this.props.onFilter(undefined);
    }

    render() {
        return (
            <Form inline>

                <FormGroup controlId="description-filter">
                    <ControlLabel>Descrição</ControlLabel>
                    {' '}
                    <TransactionDescription
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        maxLength="120"
                    />
                </FormGroup>

                {' '}

                <DateInterval 
                    id="due_date"
                    value_from={this.state.raw.due_date_from}
                    value_until={this.state.raw.due_date_until}
                    onChange={this.handleDateChange}
                >
                    Vencimento
                </DateInterval>
                
                {' '}

                <FormGroup controlId="category-filter">
                    <ControlLabel>Categorias</ControlLabel>
                    {' '}
                    <MultiCategorySelectPicker 
                        value={this.state.raw.multi_category}
                        onChange={this.handleCategoryChange} />
                </FormGroup>

                {' '}

                <FormGroup controlId="payed-filter">
                    <ControlLabel>Pago?</ControlLabel>
                    {' '}
                    <FormControl name="payed" componentClass="select" value={this.state.payed} onChange={this.handleChange}>
                        <option value="-1">-</option>
                        <option value="0">NÃO</option>
                        <option value="1">SIM</option>
                    </FormControl>
                </FormGroup>

                {' '}

                {this.state.payed == 1 && <DateInterval 
                    id="payment_date"
                    value_from={this.state.raw.payment_date_from}
                    value_until={this.state.raw.payment_date_until}
                    onChange={this.handleDateChange}
                >
                    Pagamento
                </DateInterval>}

                <Button onClick={this.handleClick} disabled={this.props.isFetching}>Filtrar</Button>
                <Button onClick={this.handleClear}>Limpar</Button>
            </Form>
        );
    }
}

TransactionFilter.propTypes = {
    onFilter: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
}

export default TransactionFilter;