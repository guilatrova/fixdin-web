import React from 'react';
import PropTypes from 'prop-types';
import DatetimeInput from 'react-datetime';

import HorizontalFormGroupError from './../../../common/components/forms/HorizontalFormGroupError';

import { FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

export default class Periodic extends React.Component{    
    static propTypes = {
        visible: PropTypes.bool,
        onChange: PropTypes.func
    }

    state = {
        period: 'daily',
        distance: "",
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
            <HorizontalFormGroupError
                id="distance"
                label="A cada"
                value={this.state.distance}
                onChange={(e) => this.handleChange('distance', e.target.value)} />
            
            <FormControl>
                <InputLabel htmlFor="input-frequency">Frequência</InputLabel>
                <Select
                    name="period"
                    value={this.state.period}
                    onChange={(e) => this.handleChange('period', e.target.value)}
                    input={<Input id="input-frequency" />}
                >
                    <MenuItem value={'daily'}>dias</MenuItem>
                    <MenuItem value={'weekly'}>semanas</MenuItem>
                    <MenuItem value={'monthly'}>meses</MenuItem>
                    <MenuItem value={'yearly'}>anos</MenuItem>
                </Select>
            </FormControl>

            <HorizontalFormGroupError
                id="how_many"
                label="vezes"                        
                value={this.state.how_many}
                onChange={(e) => this.handleLimitChange('how_many', e.target.value)} />

            <HorizontalFormGroupError id="until" label="Até" >
                <DatetimeInput
                    timeFormat={false}
                    className='border-focus-blue'
                    value={this.state.until}
                    onChange={(value) => this.handleLimitChange('until', value)}
                    closeOnSelect={true}
                    closeOnTab={true} />
            </HorizontalFormGroupError>
            </div>
        );
    }
}