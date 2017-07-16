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
            raw: {}
        }
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

    handleClick(e) {
        const { raw, ...other } = this.state;
        this.props.onFilter(other);
    }

    handleClear(e) {
        this.props.onFilter(undefined);
    }

    render() {
        return (
            <Form inline>
                <FormGroup controlId="due_date-filter">
                    <ControlLabel>Vencimento de</ControlLabel>
                    {' '}
                    <DatetimeInput
                        timeFormat={false}
                        onChange={(value) => this.handleDateChange('due_date', value)}
                        value={this.state.raw.due_date}
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


                <Button onClick={this.handleClick}>Filtrar</Button>
                <Button onClick={this.handleClear}>Limpar</Button>
            </Form>
        );
    }
}

TransactionFilter.propTypes = {
    onFilter: PropTypes.func.isRequired
}

export default TransactionFilter;