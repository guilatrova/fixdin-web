import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'react-autocomplete';
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

class TransactionFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payed: -1,
            raw: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
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

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick(e) {
        const { raw, ...other } = this.state;
        this.props.onFilter(other);
    }

    handleClear(e) {
        this.setState({
            raw: {}
        })
        this.props.onFilter(undefined);
    }

    render() {
        return (
            <Form inline>
                <FormGroup controlId="due_date_from-filter">
                    <ControlLabel>Vencimento de</ControlLabel>
                    {' '}
                    <DatetimeInput
                        timeFormat={false}
                        onChange={(value) => this.handleDateChange('due_date_from', value)}
                        value={this.state.raw.due_date_from}
                        closeOnSelect={true}
                        closeOnTab={true} />
                </FormGroup>

                {' '}

                <FormGroup controlId="due_date_until-filter">
                    <ControlLabel>Vencimento até</ControlLabel>
                    {' '}
                    <DatetimeInput
                        timeFormat={false}
                        onChange={(value) => this.handleDateChange('due_date_until', value)}
                        value={this.state.raw.due_date_until}
                        closeOnSelect={true}
                        closeOnTab={true} />
                </FormGroup>

                {' '}

                <FormGroup controlId="category-filter">
                    <ControlLabel>Categoria</ControlLabel>
                    {' '}
                    <FormControl                        
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category} />
                </FormGroup>

                {' '}

                <FormGroup controlId="payed-filter">
                    <ControlLabel>Pago?</ControlLabel>
                    <FormControl name="payed" componentClass="select" value={this.state.payed} onChange={this.handleChange}>
                        <option value="-1">-</option>
                        <option value="0">NÃO</option>
                        <option value="1">SIM</option>
                    </FormControl>
                </FormGroup>

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