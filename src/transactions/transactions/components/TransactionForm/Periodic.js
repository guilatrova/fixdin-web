import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import { withStyles } from '@material-ui/core/styles';

import DatePicker from 'material-ui-pickers/DatePicker';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

import { FormControlLabel } from '@material-ui/core';

const styles = {
    smallInput: {
        maxWidth: 60,
    },
    marginInput: {
        marginLeft: 10,
        marginRight: 10
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column'
    }
};

class Periodic extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        visible: PropTypes.bool,
        onChange: PropTypes.func
    }

    state = {
        frequency: "monthly",
        interval: "1",
        how_many: "",
        how_it_ends: "on-date",
        until: undefined
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value }, () => {
            this.props.onChange(this.state);
        });
    }

    handleLimitChange = (key, value) => {
        if (key === 'until') {
            this.setState({ how_many: "" });
        }
        else {
            this.setState({ until: undefined });
        }
        this.handleChange(key, value);
    }

    render() {
        const { classes, visible } = this.props;

        if (!visible)
            return null;

        return (
            <div>
                <div className={classes.flex}>
                    <FormLabel component="legend">Repetir a cada</FormLabel>

                    <TextField
                        inputProps={{ style: { textAlign: "right" } }}
                        className={cn(classes.smallInput, classes.marginInput)}
                        value={this.state.interval}
                        type="number"
                        onChange={e => this.handleChange('interval', e.target.value)} />

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
                </div>

                <FormControl>
                    <FormLabel component="legend">Termina</FormLabel>

                    <div className={classes.flexCol}>
                        <FormControlLabel label="Em"
                            control={<div>
                                <Radio name="periodic-finishes" color="primary" value="on-date" checked={this.state.how_it_ends == 'on-date'} />
                            </div>}
                        />
                        <FormControlLabel label="Após"
                            control={<div>
                                <Radio name="periodic-finishes" color="primary" value="after-times" checked={this.state.how_it_ends == 'after-times'} />
                            </div>}
                        />
                    </div>
                </FormControl>

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

export default withStyles(styles)(Periodic);
