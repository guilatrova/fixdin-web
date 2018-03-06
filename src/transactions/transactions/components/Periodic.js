import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import TextFieldError from './../../../common/material/TextFieldError';

export default class Periodic extends React.Component{    
    static propTypes = {
        visible: PropTypes.bool,
        onChange: PropTypes.func
    }

    state = {
        frequency: 'monthly',
        interval: "1",
        how_many: "",
        until: undefined
    }

    handleChange(key, value) {
        this.setState({ [key]: value }, () => {
            this.props.onChange(this.state);
        });
    }

    handleLimitChange(key, value) {
        if (key === 'until') {
            this.setState({ how_many: "" });
        }
        else {
            this.setState({ until: undefined });
        }
        this.handleChange(key, value);
    }

    render() {
        const { visible } = this.props;

        if (!visible) 
            return null;

        return (
            <div>
            <TextFieldError
                id="interval"
                label="A cada"
                value={this.state.interval}
                onChange={e => this.handleChange('interval', e.target.value)} />
            
            <FormControl>
                <InputLabel htmlFor="input-frequency">Frequência</InputLabel>
                <Select
                    name="frequency"
                    value={this.state.frequency}
                    onChange={e => this.handleChange('frequency', e.target.value)}
                    input={<Input id="input-frequency" />}
                >
                    <MenuItem value={'daily'}>dias</MenuItem>
                    <MenuItem value={'weekly'}>semanas</MenuItem>
                    <MenuItem value={'monthly'}>meses</MenuItem>
                    <MenuItem value={'yearly'}>anos</MenuItem>
                </Select>
            </FormControl>

            <TextFieldError
                id="how_many"
                label="vezes"                        
                value={this.state.how_many}
                onChange={e => this.handleLimitChange('how_many', e.target.value)} />

            <DatePicker
                keyboard
                label="Até"
                value={this.state.until}
                onChange={value => this.handleLimitChange('until', value)}
                autoOk={true}
                format="DD MMMM YYYY"
            />
            </div>
        );
    }
}